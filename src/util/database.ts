import { Database } from "sqlite3";

const path = require("path");
const sqlite3 = require("sqlite3");

const dbPath = path.resolve(__dirname, "..", "storage", "charts.db");

let _db: Database;
const sqLiteConnect = (callback: () => void) => {
  const dbConnect = sqlite3.verbose();
  _db = new dbConnect.Database(dbPath, sqlite3.OPEN_READWRITE, (err: Error) => {
    if (err) {
      console.error("Error occured", err.message);
    } else {
      console.log("Connected to the database.");
      callback();
    }
  });
};

const getDb = () => {
  if (_db) return _db;
  throw "No database found";
};

module.exports = { sqLiteConnect, getDb };
