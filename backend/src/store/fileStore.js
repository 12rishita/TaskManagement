import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { nanoid } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../../data/db.json');

const emptyDb = { users: [], tasks: [] };

export async function ensureFileStore() {
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(dbPath, JSON.stringify(emptyDb, null, 2));
  }
}

export async function readDb() {
  await ensureFileStore();
  const raw = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(raw || JSON.stringify(emptyDb));
}

export async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

export function makeId() {
  return nanoid(12);
}
