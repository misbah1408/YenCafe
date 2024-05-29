import { Order } from "../models/Order.model.js";
import { User } from "../models/User.model.js";

const checkoutController = async (req, res) => {
  try {
    const userId = req.user?.id; // Extract the user ID from the request object
    const user = await User.findOne({ _id: userId }, { name: 1 });
    const userName = user?.name;
    // console.log(req.user)
    // Ensure cartItems is present in the request body
    const cartItems = req.body;
    // console.log(cartItems.cart)
    if (!cartItems) {
      return res.status(400).json({ error: "Cart items are required" });
    }

    // Save the order to the database, associating it with the user
    const newOrder = new Order({
      orderData: cartItems.cart,
      userId,
      userName,
      location : cartItems.location
    });
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const orderController = async (req, res) => {
  try {
    const userId = req.user?.id;
    // console.log(req.user)
    const orders = await Order.find({ userId:userId });
    // console.log(orders)
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { checkoutController, orderController };
