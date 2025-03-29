import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

// Initialize SQLite database
async function openDb() {
  return open({
    filename: "./mood.db",
    driver: sqlite3.Database
  });
}

// Create table if it doesn't exist
async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS mood_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      moodScore INTEGER,
      description TEXT,
      moodNote TEXT,
      createdAt TEXT
    )
  `);
  return db;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await initDb();
    
    const result = await db.run(
      `INSERT INTO mood_entries (moodScore, description, moodNote, createdAt) VALUES (?, ?, ?, ?)`,
      [body.moodScore, body.description, body.moodNote, new Date().toISOString()]
    );

    return NextResponse.json({
      id: result.lastID,
      ...body,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving mood entry:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await initDb();
    const entries = await db.all(
      `SELECT * FROM mood_entries ORDER BY createdAt DESC`
    );

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching mood entries:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
} 