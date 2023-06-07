import { Database } from "sqlite3";
import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.resolve(__dirname, "..", "storage", "calendar.db");

let _db: Database;
export const sqLiteConnect = (callback: () => void) => {
  const dbConnect = sqlite3.verbose();
  _db = new dbConnect.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Error occured", err.message);
    } else {
      console.log("Connected to the database.");
      callback();
    }
  });
};

export const getDb = () => {
  if (_db) return _db;
  throw "No database found";
};

// module.exports = { sqLiteConnect, getDb };
