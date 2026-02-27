const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mvp_db';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Model
const ResultSchema = new mongoose.Schema({
  codingScore:        { type: Number, required: true },
  aptitudeScore:      { type: Number, required: true },
  communicationScore: { type: Number, required: true },
  readinessIndex:     { type: Number, required: true },
  createdAt:          { type: Date, default: Date.now }
});
const Result = mongoose.model('Result', ResultSchema);

// POST /api/submit-test
app.post('/api/submit-test', async (req, res) => {
  try {
    const { codingScore, aptitudeScore, communicationScore } = req.body;
    if (codingScore === undefined || aptitudeScore === undefined || communicationScore === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const readinessIndex = parseFloat(
      (codingScore * 0.4 + aptitudeScore * 0.3 + communicationScore * 0.3).toFixed(2)
    );
    const result = await Result.create({ codingScore, aptitudeScore, communicationScore, readinessIndex });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/latest-result
app.get('/api/latest-result', async (req, res) => {
  try {
    const result = await Result.findOne().sort({ createdAt: -1 });
    if (!result) return res.status(404).json({ error: 'No results found' });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
