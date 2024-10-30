import { io } from "socket.io-client";
import { token } from "./Constants";

export const createSocketInstance = (url = process.env.REACT_APP_FETCH_URL) => {
  return io(url, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
