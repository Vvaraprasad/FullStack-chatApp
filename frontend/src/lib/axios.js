import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: 'https://fullstack-chatapp-12.onrender.com/api',
  withCredentials: true,
});
// import axios from 'axios';

// export const axiosInstance = axios.create({
//   baseURL:
//     import.meta.env.MODE === 'development'
//       ? 'http://localhost:5001/api'
//       : '/api',
//   withCredentials: true,
// });