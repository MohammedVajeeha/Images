// ImageGallery.js
import React, { useEffect, useState } from 'react';
//import axiosInstance from './axiosInstance'; // Import your axios instance
import axios from 'axios';
function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from your server using a GET request
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get('api/files/images'); // Replace with your server's endpoint
        setImages(response.data); // Assuming your server sends an array of image URLs
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);


  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your server's URL
  });
  

  
  return (
    <div>
      <h2>Image Gallery</h2>
      <div className="image-container">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Image ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
