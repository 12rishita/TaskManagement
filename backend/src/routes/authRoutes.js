import bcrypt from 'bcryptjs';
import express from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { requireAuth, signToken } from '../middleware/auth.js';
import User from '../models/User.js';
import { makeId, readDb, writeDb } from '../store/fileStore.js';

const router = express.Router();

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Password is required')
});

function publicUser(user) {
  return { id: user.id || user._id?.toString(), name: user.name, email: user.email };
}

router.post('/register', async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const email = payload.email.toLowerCase();
    const passwordHash = await bcrypt.hash(payload.password, 10);

    let user;
    if (mongoose.connection.readyState === 1) {
      const exists = await User.findOne({ email });
      if (exists) return res.status(409).json({ message: 'Email already registered' });
      user = await User.create({ name: payload.name, email, passwordHash });
    } else {
      const db = await readDb();
      if (db.users.some((item) => item.email === email)) {
        return res.status(409).json({ message: 'Email already registered' });
      }
      user = { id: makeId(), name: payload.name, email, passwordHash, createdAt: new Date().toISOString() };
      db.users.push(user);
      await writeDb(db);
    }

    res.status(201).json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const email = payload.email.toLowerCase();

    let user;
    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ email });
    } else {
      const db = await readDb();
      user = db.users.find((item) => item.email === email);
    }

    if (!user || !(await bcrypt.compare(payload.password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ user: publicUser(user), token: signToken(user) });
  } catch (error) {
    next(error);
  }
});

router.get('/profile', requireAuth, async (req, res, next) => {
  try {
    let user;
    if (mongoose.connection.readyState === 1) {
      user = await User.findById(req.user.id);
    } else {
      const db = await readDb();
      user = db.users.find((item) => item.id === req.user.id);
    }

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: publicUser(user) });
  } catch (error) {
    next(error);
  }
});

export default router;
