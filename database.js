// database.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

// Create a 'waitlist' table
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS waitlist (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)");
});

module.exports = db;
