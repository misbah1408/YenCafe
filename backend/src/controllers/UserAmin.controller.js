import { Order } from "../models/Order.model.js";
import { User } from "../models/User.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { password: 0, isAdmin: 0, updatedAt: 0 }
    );

    if (!users || users.length == 0) {
      return res.status(404).json({ message: "No users found" });
    }
    // console.log(users)
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(
      {},{delivered: false}
    );
    if (!orders || orders.length == 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    // console.log(orders)
    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export {getAllUsers, getAllOrders};
