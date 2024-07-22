import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from 'socket.io';
import userRoutes from './routes/User.routes.js';
import foodDataRoutes from './routes/FoodData.routes.js';
import orderData from "./routes/OrderData.routes.js"
import adminRouter from "./routes/Admin.routes.js";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(express.static("public"));
app.use(cookieParser());

const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN, credentials: true }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/v1", userRoutes);
app.use("/api/v1", foodDataRoutes);
app.use("/api/v1", orderData);
app.use("/api/v1", adminRouter);

export default server;
