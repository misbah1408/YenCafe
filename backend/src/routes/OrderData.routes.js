import { Router } from "express";
import { checkoutController, orderController } from "../middlewares/order.middleware.js";
import jwtMiddleware from "../middlewares/auth.middleware.js";

const orderData = Router();


orderData.route("/checkout").post( jwtMiddleware, checkoutController )
orderData.route("/orders").get( jwtMiddleware, orderController )


export default orderData;
