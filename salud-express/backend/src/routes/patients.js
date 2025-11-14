const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// @route   GET api/patients
// @desc    Get all patients
// @access  Public
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/patients
// @desc    Create a new patient
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.json(newPatient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
