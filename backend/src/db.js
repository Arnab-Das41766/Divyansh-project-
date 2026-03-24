import initSqlJs from 'sql.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

// ── File path ──────────────────────────────────────────────────────────────
const dbPath     = process.env.SQLITE_DB_PATH || './data/pricecompare.db';
const resolvedPath = resolve(dbPath);
const dir        = dirname(resolvedPath);

if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

// ── Boot sql.js (pure-JS WASM, no native build needed) ────────────────────
// Top-level await is allowed because the project uses "type": "module"
const SQL = await initSqlJs();

// Load existing DB file, or start fresh
const sqlDb = existsSync(resolvedPath)
  ? new SQL.Database(readFileSync(resolvedPath))
  : new SQL.Database();

// Auto-persist every write to the .sqlite file on disk
const persist = () => writeFileSync(resolvedPath, Buffer.from(sqlDb.export()));

// ── Schema ────────────────────────────────────────────────────────────────
sqlDb.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL UNIQUE,
    password    TEXT    NOT NULL,
    role        TEXT    NOT NULL DEFAULT 'user',
    is_verified INTEGER NOT NULL DEFAULT 0,
    shop_name   TEXT,
    phone       TEXT,
    address     TEXT,
    city        TEXT,
    avatar      TEXT,
    created_at  TEXT DEFAULT (datetime('now')),
    updated_at  TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS otps (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    email      TEXT    NOT NULL,
    otp        TEXT    NOT NULL,
    expires_at TEXT    NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

persist(); // write schema to disk immediately

console.log(`SQLite DB initialized at: ${resolvedPath}`);

// ── better-sqlite3-compatible API wrapper ─────────────────────────────────
//
// Exposes: db.prepare(sql).get(...params)
//          db.prepare(sql).all(...params)
//          db.prepare(sql).run(...params)  → { lastInsertRowid }
//
// Controllers use this API unchanged; only the engine underneath differs.

const db = {
  prepare(sql) {
    return {
      /** Return the first matching row as a plain object, or undefined. */
      get(...args) {
        const stmt = sqlDb.prepare(sql);
        if (args.length) stmt.bind(args);
        const row = stmt.step() ? stmt.getAsObject() : undefined;
        stmt.free();
        return row;
      },

      /** Return all matching rows as an array of plain objects. */
      all(...args) {
        const stmt = sqlDb.prepare(sql);
        if (args.length) stmt.bind(args);
        const rows = [];
        while (stmt.step()) rows.push(stmt.getAsObject());
        stmt.free();
        return rows;
      },

      /** Execute a write statement, persist to disk, return lastInsertRowid. */
      run(...args) {
        sqlDb.run(sql, args.length ? args : []);
        const lastId = sqlDb.exec('SELECT last_insert_rowid()');
        persist();
        return {
          lastInsertRowid: lastId[0]?.values[0]?.[0] ?? null
        };
      }
    };
  },

  /** Execute raw multi-statement SQL (schema maintenance etc.) */
  exec(sql) {
    sqlDb.exec(sql);
    persist();
  }
};

export default db;
