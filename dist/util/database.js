"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDb = exports.sqLiteConnect = void 0;
const path_1 = __importDefault(require("path"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const dbPath = path_1.default.resolve(__dirname, "..", "storage", "calendar.db");
let _db;
const sqLiteConnect = (callback) => {
    const dbConnect = sqlite3_1.default.verbose();
    _db = new dbConnect.Database(dbPath, sqlite3_1.default.OPEN_READWRITE, (err) => {
        if (err) {
            console.error("Error occured", err.message);
        }
        else {
            console.log("Connected to the database.");
            callback();
        }
    });
};
exports.sqLiteConnect = sqLiteConnect;
const getDb = () => {
    if (_db)
        return _db;
    throw "No database found";
};
exports.getDb = getDb;
// module.exports = { sqLiteConnect, getDb };
