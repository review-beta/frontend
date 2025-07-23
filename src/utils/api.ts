import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.0.163:8080/api/', // your Django API root
  headers: {
    'Content-Type': 'application/json',
  },
});

export function isLoggedIn(): boolean {
  const token = localStorage.getItem("accessToken");
  return !!token;
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  // You can also clear other user info if stored
}

export default API;
