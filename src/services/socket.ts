import { io } from "socket.io-client";

// GANTI localhost ke domain backend Railway
const socket = io("https://circle-be-production-6eed.up.railway.app/api/v1", {
  withCredentials: true,
});

export default socket;
