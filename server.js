const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Use the standard fs module
const path = require('path');
const multer = require('multer');
const os = require('os');

const app = express();

app.use(cors());
app.use(express.json());

// This is a critical part for Vercel. It can only write to the /tmp directory.
const uploadDirectory = os.tmpdir();
// This correctly points to the 'src/data' directory when running on Vercel
const dataDirectory = path.resolve(process.cwd(), 'src', 'data');

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
  // IMPORTANT: On Vercel, this uploaded file is temporary and will not be saved with your project.
  // This endpoint's purpose is to allow local development to function as expected.
  // The official workflow is to commit uploaded images with your code.
  res.send({ filePath: `/uploads/${path.basename(req.file.path)}` });
});

app.get('/api/data/:filename', (req, res) => {
  const filePath = path.join(dataDirectory, req.params.filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send({ error: `File not found at ${filePath}` });
    }
    res.send(JSON.parse(data));
  });
});

app.post('/api/data/:filename', (req, res) => {
  // Vercel's filesystem is read-only. This endpoint will fail on deployment.
  // It is ONLY for local development. Content changes must be deployed via Git.
  if (process.env.VERCEL) {
    return res.status(403).send({ error: 'Filesystem is read-only on Vercel.' });
  }
  const filePath = path.join(dataDirectory, req.params.filename);
  fs.writeFile(filePath, JSON.stringify(req.body, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).send({ error: 'Failed to write file locally.' });
    }
    res.send({ success: true, message: `${req.params.filename} updated.` });
  });
});

// Export the app for Vercel's serverless environment
module.exports = app;