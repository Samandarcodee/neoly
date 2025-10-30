import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInstance = null;

export function initSqlite() {
  if (dbInstance) return dbInstance;
  const dbPath = path.join(__dirname, '..', 'data.sqlite');
  const db = new Database(dbPath);

  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS habits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT UNIQUE,
      userId TEXT NOT NULL,
      title TEXT NOT NULL,
      duration INTEGER NOT NULL,
      currentDay INTEGER DEFAULT 0,
      startDate TEXT DEFAULT (datetime('now')),
      completed INTEGER DEFAULT 0,
      lastCheckIn TEXT,
      checkInHistory TEXT DEFAULT '[]',
      createdAt TEXT DEFAULT (datetime('now')),
      updatedAt TEXT DEFAULT (datetime('now'))
    );
  `);

  dbInstance = db;
  console.log('🗄️ SQLite initialized at', dbPath);
  return dbInstance;
}

export function getDb() {
  if (!dbInstance) {
    return initSqlite();
  }
  return dbInstance;
}


