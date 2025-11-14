const express = require('express');
const router = express.Router();
const db = require('../config/database');

// @route   GET api/results
// @desc    Get all medical results
// @access  Public
router.get('/', (req, res) => {
  db.all("SELECT * FROM medical_results", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// @route   POST api/results
// @desc    Add a new medical result and create alerts if necessary
// @access  Public
router.post('/', (req, res) => {
  const { patient_id, test_type, value, date, notes } = req.body;
  const sql = "INSERT INTO medical_results (patient_id, test_type, value, date, notes) VALUES (?, ?, ?, ?, ?)";

  db.run(sql, [patient_id, test_type, value, date, notes], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // Check for critical glucose levels and create an alert
    if (test_type === 'glucosa' && value > 180) {
      const alert = {
        patient_id,
        type: 'Alerta de Glucosa',
        message: `Nivel de glucosa crítico detectado: ${value} mg/dL`,
        severity: 'alta',
        created_at: new Date().toISOString()
      };

      const alertSql = "INSERT INTO alerts (patient_id, type, message, severity, created_at) VALUES (?, ?, ?, ?, ?)";
      db.run(alertSql, [alert.patient_id, alert.type, alert.message, alert.severity, alert.created_at]);
    }

    res.json({
      message: 'Result added successfully',
      id: this.lastID
    });
  });
});

// @route   GET api/alerts
// @desc    Get all alerts
// @access  Public
router.get('/alerts', (req, res) => {
  db.all("SELECT * FROM alerts ORDER BY created_at DESC", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
