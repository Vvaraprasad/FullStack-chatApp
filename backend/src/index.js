import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import { connectDB } from './lib/db.js';
import { app, server } from './lib/socket.js';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';

// Load environment variables
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

const PORT = process.env.PORT;

// Resolve __dirname manually for ES Modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log('Server is running on PORT:', PORT);
  connectDB();
});
