import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const getToken = () => {
  const persistRoot = localStorage.getItem("persist:root");
  if (!persistRoot) return "";

  try {
    const rootData = JSON.parse(persistRoot);
    const userData = rootData.user ? JSON.parse(rootData.user) : null;
    return userData?.currentUser?.accessToken || "";
  } catch (error) {
    return "";
  }
};

export const TOKEN = getToken();

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headerss: { token: `Bearer ${TOKEN}` },
});
