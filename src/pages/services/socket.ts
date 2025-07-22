// src/utils/socket.ts
import { io } from "socket.io-client";

const socket = io("http://localhost:2002", {
  withCredentials: true,
});

export default socket;
