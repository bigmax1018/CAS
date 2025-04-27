// src/core/database.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getDb() {
  return open({
    filename: './local.db', // SQLite file
    driver: sqlite3.Database
  });
}