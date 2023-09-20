const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../Models/File'); // Assuming the correct path and case for the model

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Use a unique filename
    },
  });
  

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        console.error('No file uploaded.');
        return res.status(400).json({ error: 'No file uploaded.' });
      }
  
      console.log('Uploaded file details:', req.file); // Add this line to see file details
  
      const { filename, path } = req.file;
      const type = req.file.mimetype.startsWith('image') ? 'image' : 'video';
      console.log('File type:', type); // Add this line to see the file type
  
      const newFile = new File({ filename, path, type });
      await newFile.save();
  
      console.log('File saved:', newFile); // Add this line to see if the file was saved correctly
  
      res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (error) {
      console.error('File upload error:', error);
      res.status(500).json({ error: 'File upload failed.' });
    }
  });
  

// Serve the file for download
router.get('/download/:filename', (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join(__dirname, '..', 'uploads', filename); // Construct the full file path
  
      // Check if the file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
      }
  
      // If the file exists, send it as a response
      res.sendFile(filePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'File retrieval failed.' });
    }
  });
  

module.exports = router;
