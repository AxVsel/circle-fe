// services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:2002",
  withCredentials: true, // ✅ ini penting agar cookie ikut terkirim
});
