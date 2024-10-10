import { Router } from "express";
import { checkoutController, orderController, verifyPaymentController } from "../controllers/Order.controller.js";
import jwtMiddleware from "../middlewares/auth.middleware.js";

const orderData = Router();


orderData.route("/checkout").post( jwtMiddleware, checkoutController )
orderData.route("/verify-payment").post( verifyPaymentController )
orderData.route("/orders").get( jwtMiddleware, orderController )


export default orderData;
