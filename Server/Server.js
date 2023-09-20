const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fileRoutes = require('../Routes/Routes'); // Use the correct path to your routes file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

// Your database configuration
const username = 'vajeeha';
const password = 'vajeehadb';
const clusterUrl = 'cluster0.3uinwya.mongodb.net';
const dbName = 'ImgDb';
const databaseUrl = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}`;
mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });

app.use('/api/files', fileRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
