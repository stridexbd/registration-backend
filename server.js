// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // to parse JSON body

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

// Create a Schema & Model for registrations
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String
});
const Registration = mongoose.model('Registration', registrationSchema);

// API Route to handle registration
app.post('/register', async (req, res) => {
  try {
    const data = new Registration(req.body);
    await data.save();
    res.status(201).json({ message: 'Registration saved!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
