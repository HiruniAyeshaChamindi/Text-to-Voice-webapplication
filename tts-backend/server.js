require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const Gtts = require('gtts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// File upload setup
const upload = multer({ dest: 'uploads/' });

// Create 'uploads' directory if missing
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Free TTS endpoint
app.post('/api/convert', async (req, res) => {
  try {
    const { text, language = 'en' } = req.body;
    
    if (!text) return res.status(400).json({ error: 'Text is required' });

    const gtts = new Gtts(text, language);
    res.setHeader('Content-Type', 'audio/mpeg');
    gtts.stream().pipe(res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Conversion failed' });
  }
});

// File upload endpoint
app.post('/api/convert-file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const text = fs.readFileSync(req.file.path, 'utf8');
    fs.unlinkSync(req.file.path); // Delete temp file

    const gtts = new Gtts(text, 'en');
    res.setHeader('Content-Type', 'audio/mpeg');
    gtts.stream().pipe(res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'File processing failed' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));