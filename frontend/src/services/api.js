import axios from 'axios';
import { API_BASE_URL } from '../config';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const habitService = {
  // Create a new habit
  createHabit: async (userId, title, duration) => {
    const response = await api.post('/api/habits', {
      userId,
      title,
      duration: parseInt(duration)
    });
    return response.data;
  },

  // Get all habits for a user
  getUserHabits: async (userId) => {
    const response = await api.get(`/api/habits/${userId}`);
    return response.data;
  },

  // Get a single habit
  getHabit: async (id) => {
    const response = await api.get(`/api/habits/single/${id}`);
    return response.data;
  },

  // Update habit progress (check-in)
  checkInHabit: async (id) => {
    const response = await api.patch(`/api/habits/${id}`);
    return response.data;
  },
};

export default api;

