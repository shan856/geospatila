const express = require('express');
const cors = require('cors');
const fs = require('fs/promises'); // Use promise-based fs
const path = require('path');
const multer = require('multer');
const os = require('os');

const app = express();

app.use(cors());
app.use(express.json());

// Vercel writes files to a temporary directory
const uploadDirectory = os.tmpdir();
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
  // NOTE: In a real serverless setup, you'd upload this to a storage service (like S3).
  // This temporary solution will work for the demo, but the image will not persist between deployments.
  // For the purpose of getting the file path into JSON, this is sufficient.
  res.send({ filePath: `/uploads/${path.basename(req.file.path)}` }); // This is a temporary path
});

app.get('/api/data/:filename', async (req, res) => {
  const filePath = path.join(dataDirectory, req.params.filename);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    res.send(JSON.parse(data));
  } catch (error) {
    res.status(404).send({ error: 'File not found.' });
  }
});

app.post('/api/data/:filename', async (req, res) => {
  // IMPORTANT: Vercel has a read-only filesystem. This endpoint will NOT work on the deployed site.
  // It is here ONLY to allow the local development server (`npm start`) to function.
  // The official workflow is to edit locally and push changes via Git.
  if (process.env.VERCEL) {
    return res.status(403).send({ error: 'Filesystem is read-only on Vercel.' });
  }
  const filePath = path.join(dataDirectory, req.params.filename);
  try {
    await fs.writeFile(filePath, JSON.stringify(req.body, null, 2), 'utf8');
    res.send({ success: true, message: `${req.params.filename} updated.` });
  } catch (error) {
    res.status(500).send({ error: 'Failed to write file.' });
  }
});

// Export the app for Vercel to use
module.exports = app;