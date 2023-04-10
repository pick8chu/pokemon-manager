import axios, { AxiosInstance } from 'axios';

export const API: AxiosInstance = axios.create({
  baseURL: 'http://api:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});