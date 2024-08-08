import { io } from "socket.io-client";
import { token } from "./Constants";

// Factory function to create a new WebSocket instance
export const createSocketInstance = (url = "http://localhost:5000/") => {
  return io(url, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
