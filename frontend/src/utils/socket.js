import { io } from "socket.io-client";
import { token } from "./Constants";

export const createSocketInstance = (url = process.env.RECAT_APP_SCOKETIO_URL) => {
  // console.log(url)
  return io(url, {
    extraHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
