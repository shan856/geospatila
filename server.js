const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // Handles file uploads

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const dataDirectory = path.join(__dirname, 'src', 'data');
const uploadDirectory = path.join(__dirname, 'public', 'uploads');

// CRITICAL FIX: Ensure the upload directory exists.
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Multer configuration for storing uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// --- API Endpoints ---

// THIS IS THE ROUTE THAT WAS MISSING
app.post('/api/upload', upload.single('projectImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded.' });
  }
  res.send({ filePath: `/uploads/${req.file.filename}` });
});

// GET a specific JSON file
app.get('/api/data/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(dataDirectory, filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send({ error: 'File not found.' });
    res.send(JSON.parse(data));
  });
});

// POST (update) a specific JSON file
app.post('/api/data/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(dataDirectory, filename);
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), 'utf8', (err) => {
    if (err) return res.status(500).send({ error: 'Failed to write file.' });
    res.send({ success: true, message: `${filename} updated successfully.` });
  });
});

app.listen(PORT, () => {
  console.log(`JSON API server is running on http://localhost:${PORT}`);
});