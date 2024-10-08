import { Order } from "../models/Order.model.js";
import { User } from "../models/User.model.js";
import razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance using environment variables
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Controller for handling checkout and payment order creation
const checkoutController = async (req, res) => {
  try {
    const userId = req.user?.id; // Get user ID from the request (assumes authentication middleware)
    const user = await User.findOne({ _id: userId });
    const campusId = user?.campusId;

    const cartItems = req.body;
    if (!cartItems) {
      return res.status(400).json({ error: "Cart items are required" });
    }

    const newOrder = new Order({
      orderData: cartItems.cart,
      userId,
      campusId,
      location: cartItems.location,
      status: "Yet deliver",
      total: cartItems.total,
      paymentMethod: cartItems.paymentMethod,
      paymentStatus: "NOT PAID"
    });
    const savedOrder = await newOrder.save();

    if (cartItems.paymentMethod === "UPI") {
      const amountInPaise = cartItems.total * 100;
      const orderOptions = {
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt_order_${savedOrder._id}`,
      };

      const razorpayOrder = await razorpayInstance.orders.create(orderOptions);

      savedOrder.razorpayOrderId = razorpayOrder.id;
      await savedOrder.save();

      const orders = await Order.find({});
      req.io.emit('orderUpdate', orders);

      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        orderId: savedOrder._id,
        razorpay_order_id: razorpayOrder.id,
        amount: orderOptions.amount,
        currency: orderOptions.currency,
      });
    }

    // If payment method is not UPI, proceed without creating a Razorpay order
    res.status(201).json({
      success: true,
      message: "Order created successfully without payment gateway",
      orderId: savedOrder._id,
    });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to verify payment (called after frontend sends payment details)
const verifyPaymentController = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // console.log('Request Body:', razorpay_order_id, razorpay_payment_id, razorpay_signature); 
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Find the order in the database
      const order = await Order.findOne({ razorpayOrderId : razorpay_order_id });
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      order.paymentStatus = "Paid";
      order.razorpayPaymentId = razorpay_payment_id;
      await order.save();

      res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        orderId: order._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Error during payment verification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Controller to fetch user orders
const orderController = async (req, res) => {
  try {
    const userId = req.user?.id;
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { checkoutController, verifyPaymentController, orderController };