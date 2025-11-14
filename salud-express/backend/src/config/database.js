const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to the database file, which is in the root `database` directory
const dbPath = path.resolve(__dirname, '../../../database/medical.db');

// Create a new database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Successfully connected to the SQLite database.');
  }
});

module.exports = db;
