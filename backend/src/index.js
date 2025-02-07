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

// Resolve __dirname manually for ES Modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:5173', // Allow frontend in development
    credentials: true,
  })
);

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

// ✅ Serve frontend only in production
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Server is running on PORT:', PORT);
  connectDB();
});
