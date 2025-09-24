const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// IMPORTANT: This now points to the correct 'public/data' directory.
const dataDirectory = path.join(__dirname, 'public', 'data');
const uploadDirectory = path.join(__dirname, 'public', 'uploads');

// Ensure the upload directory exists.
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDirectory),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('projectImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded.' });
  }
  res.send({ filePath: `/uploads/${req.file.filename}` });
});

app.get('/api/data/:filename', (req, res) => {
  const filePath = path.join(dataDirectory, req.params.filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send({ error: `File not found.` });
    }
    res.send(JSON.parse(data));
  });
});

app.post('/api/data/:filename', (req, res) => {
  const filePath = path.join(dataDirectory, req.params.filename);
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to write file.' });
    }
    res.send({ success: true, message: `${req.params.filename} updated.` });
  });
});

app.listen(PORT, () => {
  console.log(`Local content server is running on http://localhost:${PORT}`);
});