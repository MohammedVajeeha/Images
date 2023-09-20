import React, { useState } from 'react';
import axios from 'axios';
import ImageGallery from './Image';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your server's URL
});

function App() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      66666
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axiosInstance.post('http://localhost:5000/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('File upload failed');
    }
  };

  return (
    <div className="App">
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <ImageGallery />
    </div>
  );
}

export default App;
