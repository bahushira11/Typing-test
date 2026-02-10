
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const signupUser = async (username, email, password) => {
  const res = await axios.post(`${BASE_URL}/auth/signup`, {
    username,
    email,
    password,
  });
  return res.data;
};



export const updateStats = async ({ wpm, accuracy }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(`${BASE_URL}/auth/stats`, { wpm, accuracy }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to update stats:", err);
    throw err.response?.data || { error: "Unknown error" };
  }
};


export async function getProfile() {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; 
  } catch (err) {
    throw err.response.data;
  }
}

export async function loginUser(email, password) {
  const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  const { token, username } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  return res.data;
}

