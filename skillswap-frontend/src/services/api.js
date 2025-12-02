
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser   = (data) => axios.post(`${API_URL}/auth/login`, data);
export const getSkills   = () => axios.get(`${API_URL}/skills`);
export const addSkill    = (data, token) =>
  axios.post(`${API_URL}/skills`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
