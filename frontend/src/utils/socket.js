import { io } from "socket.io-client";
import { token } from "./Constants";

export const createSocketInstance = (url = "http://localhost:5000/") => {
  return io(url, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};