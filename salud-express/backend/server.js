const express = require('express');
const cors = require('cors');
const db = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/patients', require('./src/routes/patients'));
app.use('/api/results', require('./src/routes/results'));

// Simple route for checking server status
app.get('/', (req, res) => {
  res.send('SaludExpress API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
