import express from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import Task from '../models/Task.js';
import { makeId, readDb, writeDb } from '../store/fileStore.js';

const router = express.Router();

const taskSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional().default(''),
  dueDate: z.string().optional().default(''),
  status: z.enum(['pending', 'completed']).optional().default('pending'),
  priority: z.enum(['low', 'medium', 'high']).optional().default('medium')
});

function serializeTask(task) {
  return {
    id: task.id || task._id?.toString(),
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority || 'medium',
    dueDate: task.dueDate || '',
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  };
}

function matchesQuery(task, search, status, priority) {
  const searchText = search.toLowerCase();
  const searchOk = !search
    || task.title.toLowerCase().includes(searchText)
    || (task.description || '').toLowerCase().includes(searchText);
  const statusOk = !status || task.status === status;
  const priorityOk = !priority || (task.priority || 'medium') === priority;
  return searchOk && statusOk && priorityOk;
}

router.use(requireAuth);

router.get('/stats', async (req, res, next) => {
  try {
    let tasks;
    if (mongoose.connection.readyState === 1) {
      tasks = await Task.find({ userId: req.user.id });
    } else {
      const db = await readDb();
      tasks = db.tasks.filter((task) => task.userId === req.user.id);
    }

    const completed = tasks.filter((task) => task.status === 'completed').length;
    res.json({
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
      completionPercentage: tasks.length ? Math.round((completed / tasks.length) * 100) : 0
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const search = String(req.query.search || '').trim();
    const status = ['pending', 'completed'].includes(req.query.status) ? req.query.status : '';
    const priority = ['low', 'medium', 'high'].includes(req.query.priority) ? req.query.priority : '';
    const sort = req.query.sort === 'oldest' ? 'oldest' : 'newest';

    let tasks;
    if (mongoose.connection.readyState === 1) {
      const query = { userId: req.user.id };
      if (status) query.status = status;
      if (priority) query.priority = priority;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }
      tasks = await Task.find(query).sort({ createdAt: sort === 'oldest' ? 1 : -1 });
    } else {
      const db = await readDb();
      tasks = db.tasks
        .filter((task) => task.userId === req.user.id && matchesQuery(task, search, status, priority))
        .sort((a, b) => {
          const left = new Date(a.createdAt);
          const right = new Date(b.createdAt);
          return sort === 'oldest' ? left - right : right - left;
        });
    }

    res.json({ tasks: tasks.map(serializeTask) });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payload = taskSchema.parse(req.body);
    const now = new Date().toISOString();

    let task;
    if (mongoose.connection.readyState === 1) {
      task = await Task.create({ ...payload, userId: req.user.id });
    } else {
      const db = await readDb();
      task = { id: makeId(), userId: req.user.id, ...payload, createdAt: now, updatedAt: now };
      db.tasks.push(task);
      await writeDb(db);
    }

    res.status(201).json({ task: serializeTask(task) });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const payload = taskSchema.partial().parse(req.body);
    const now = new Date().toISOString();

    let task;
    if (mongoose.connection.readyState === 1) {
      task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        payload,
        { new: true }
      );
    } else {
      const db = await readDb();
      const index = db.tasks.findIndex((item) => item.id === req.params.id && item.userId === req.user.id);
      if (index >= 0) {
        db.tasks[index] = { ...db.tasks[index], ...payload, updatedAt: now };
        task = db.tasks[index];
        await writeDb(db);
      }
    }

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ task: serializeTask(task) });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id/toggle', async (req, res, next) => {
  try {
    let task;
    if (mongoose.connection.readyState === 1) {
      const current = await Task.findOne({ _id: req.params.id, userId: req.user.id });
      if (current) {
        current.status = current.status === 'completed' ? 'pending' : 'completed';
        task = await current.save();
      }
    } else {
      const db = await readDb();
      const index = db.tasks.findIndex((item) => item.id === req.params.id && item.userId === req.user.id);
      if (index >= 0) {
        const nextStatus = db.tasks[index].status === 'completed' ? 'pending' : 'completed';
        db.tasks[index] = { ...db.tasks[index], status: nextStatus, updatedAt: new Date().toISOString() };
        task = db.tasks[index];
        await writeDb(db);
      }
    }

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ task: serializeTask(task) });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    let deleted = false;
    if (mongoose.connection.readyState === 1) {
      const result = await Task.deleteOne({ _id: req.params.id, userId: req.user.id });
      deleted = result.deletedCount > 0;
    } else {
      const db = await readDb();
      const nextTasks = db.tasks.filter((task) => !(task.id === req.params.id && task.userId === req.user.id));
      deleted = nextTasks.length !== db.tasks.length;
      db.tasks = nextTasks;
      await writeDb(db);
    }

    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
