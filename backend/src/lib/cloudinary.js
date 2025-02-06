// const express = require('express');
// const dotenv = require('dotenv').config(); // Load environment variables
// const cloudinary = require('cloudinary').v2; // Use

// const app = express();

// // Middleware
// app.use(express.json({ limit: '50mb' })); // Increase JSON payload size limit
// app.use(express.urlencoded({ extended: true, limit: '50mb' })); // Increase URL-encoded payload size limit

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });


// module.exports = { cloudinary };

import { v2 as cloudinary } from 'cloudinary';

import { config } from 'dotenv';

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;