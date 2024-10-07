import{ Order } from "../models/Order.model.js";
import { User } from "../models/User.model.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0, updatedAt: 0 });

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
    const orders = await Order.find({});
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    req.io.emit('orderUpdate', orders);
    return res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "User Not found" });
    }
    // console.log(id)
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    console.log(updatedUser.campusId)
    if (!id) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const updatedData = await User.updateOne(
      { _id: id },
      { $set: {
        campusId : updatedUser.campusId,
        email : updatedUser.email
      } }
    );
    if (!updatedData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const deliveredUpdate = async(req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    if (!id) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const upadtedData = await Order.updateOne(
      { _id: id },
      { $set: {delivered:true, status: "delivered"} }
    );
    if (!upadtedData) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Order updated successfully", upadtedData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export {
  getAllUsers,
  getAllOrders,
  deleteUserById,
  getUserById,
  deliveredUpdate,
};
