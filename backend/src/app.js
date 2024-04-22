import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from './routes/User.routes.js';
import foodDataRoutes from './routes/FoodData.routes.js';

const app = express();
app.use(cors({origin: process.env.CORS_ORIGIN,credentials: true,}));
app.use(express.json({limit: "16kb",}));
app.use(express.urlencoded({extended: true,limit: "16kb",}));
app.use(express.static("public"))
app.use(cookieParser());



app.use("/api/v1", userRoutes)
app.use("/api/v1", foodDataRoutes)


export default app;
