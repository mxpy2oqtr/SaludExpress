const db = require('../config/database');

const Patient = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM patients", [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM patients WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      });
    });
  },

  create: (patient) => {
    return new Promise((resolve, reject) => {
      const { name, email, conditions } = patient;
      db.run("INSERT INTO patients (name, email, conditions) VALUES (?, ?, ?)", [name, email, conditions], function(err) {
        if (err) {
          reject(err);
        }
        resolve({ id: this.lastID, ...patient });
      });
    });
  },

  update: (id, patient) => {
    return new Promise((resolve, reject) => {
      const { name, email, conditions } = patient;
      db.run("UPDATE patients SET name = ?, email = ?, conditions = ? WHERE id = ?", [name, email, conditions, id], function(err) {
        if (err) {
          reject(err);
        }
        resolve({ message: 'Patient updated successfully' });
      });
    });
  },
};

module.exports = Patient;
