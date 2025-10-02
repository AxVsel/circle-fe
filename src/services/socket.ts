import { io } from "socket.io-client";

// GANTI localhost ke domain backend Railway
const socket = io("http://localhost:2002", {
  withCredentials: true,
});

export default socket;
