import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import userRoutes from "./routes/User.routes.js";
import foodDataRoutes from "./routes/FoodData.routes.js";
import orderData from "./routes/OrderData.routes.js";
import adminRouter from "./routes/Admin.routes.js";
import dotenv from "dotenv"; // Import dotenv to manage environment variables

// Load environment variables from .env file
dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); 
app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id); 
  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.get("/", (req,res) => {
  res.send("<h1>Hello world</h1>")
})
// API routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", foodDataRoutes);
app.use("/api/v1", orderData);
app.use("/api/v1", adminRouter);

export default server;
