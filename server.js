// server.js (simplified version)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://stridexbd_10k:NakkRk60yDnjsb82@stridexbd10k.qikea67.mongodb.net/stridex_registrations?retryWrites=true&w=majority&appName=Stridexbd10k";

mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Schema and Model
const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);

// Routes
app.get('/', (req, res) => {
  res.json({ message: '✅ StrideX Registration Server is running' });
});

app.post('/register', async (req, res) => {
  try {
    const { name, email, phone, gender } = req.body;
    
    if (!name || !email || !phone || !gender) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const registration = new Registration({ name, email, phone, gender });
    await registration.save();
    
    res.status(201).json({ message: 'Registration successful!', id: registration._id });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
