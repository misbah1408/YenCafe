import { io } from "socket.io-client";
import { token } from "./Constants";

export const createSocketInstance = (url = "https://yencafebackend.onrender.com") => {
  // console.log(url)
  return io(url, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
