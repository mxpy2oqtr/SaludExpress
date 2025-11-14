const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Correctly resolve the path to the database file
const dbPath = path.resolve(__dirname, '../../../database/medical.db');
const db = new sqlite3.Database(dbPath);

// SQL statements to create the tables
const createPatientsTable = `
CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  conditions TEXT
);`;

const createResultsTable = `
CREATE TABLE IF NOT EXISTS medical_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL,
  test_type TEXT NOT NULL,
  value REAL NOT NULL,
  date TEXT NOT NULL,
  notes TEXT,
  FOREIGN KEY (patient_id) REFERENCES patients (id)
);`;

const createAlertsTable = `
CREATE TABLE IF NOT EXISTS alerts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (patient_id) REFERENCES patients (id)
);`;

// Function to run all table creation statements
const createTables = () => {
  db.serialize(() => {
    db.run(createPatientsTable);
    db.run(createResultsTable);
    db.run(createAlertsTable, (err) => {
      if (!err) {
        console.log("All tables created or already exist.");
        seedDatabase(); // Seed data after tables are confirmed to exist
      } else {
        console.error("Error creating tables:", err);
      }
    });
  });
};

// Function to seed the database with initial data
const seedDatabase = () => {
  const patients = [
    { name: 'Ana Garcia', email: 'ana.garcia@example.com', conditions: 'Diabetes Tipo 1' },
    { name: 'Carlos Martinez', email: 'carlos.martinez@example.com', conditions: 'Alergia al maní' }
  ];

  const results = [
    { patient_id: 1, test_type: 'glucosa', value: 190, date: new Date().toISOString(), notes: 'Post-almuerzo' },
    { patient_id: 1, test_type: 'glucosa', value: 95, date: new Date().toISOString(), notes: 'En ayunas' },
    { patient_id: 2, test_type: 'alergeno', value: 1, date: new Date().toISOString(), notes: 'Reacción leve a nueces' }
  ];

  const insertPatient = db.prepare("INSERT INTO patients (name, email, conditions) VALUES (?, ?, ?)");
  patients.forEach(p => insertPatient.run(p.name, p.email, p.conditions));
  insertPatient.finalize();

  const insertResult = db.prepare("INSERT INTO medical_results (patient_id, test_type, value, date, notes) VALUES (?, ?, ?, ?, ?)");
  results.forEach(r => insertResult.run(r.patient_id, r.test_type, r.value, r.date, r.notes));
  insertResult.finalize();

  console.log("Database seeded with initial data.");
};

// Execute the setup
createTables();

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing the database connection:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
