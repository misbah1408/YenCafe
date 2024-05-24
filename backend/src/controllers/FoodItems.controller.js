import { MainDishe } from "../models/Dishes.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

export const createFoodItem = async (req, res) => {
  const { category, title, price, veg, description, in_stock } = req.body;

  if (
    !category ||
    !title ||
    !price ||
    veg === undefined ||
    !description ||
    in_stock === undefined
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let img;
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResponse) {
        return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
      }
      img = cloudinaryResponse.secure_url;
    } else {
      return res.status(400).json({ message: "Image is required" });
    }

    const newMainDish = new MainDishe({
      category,
      title,
      price,
      veg,
      description,
      in_stock,
      img,
    });

    await newMainDish.save();
    res.status(201).json(newMainDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all food items
export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await MainDishe.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single food item by ID
export const getFoodItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const foodItem = await MainDishe.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a food item
export const updateFoodItem = async (req, res) => {
  const { id } = req.params;
  const { category, title, price, veg, description, in_stock } = req.body;

  try {
    let img;
    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResponse) {
        return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
      }
      img = cloudinaryResponse.secure_url;
    }

    const updatedData = { category, title, price, veg, description, in_stock };
    if (img) {
      updatedData.img = img;
    }

    const updatedFoodItem = await MainDishe.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedFoodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json(updatedFoodItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a food item
export const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFoodItem = await MainDishe.findByIdAndDelete(id);

    if (!deletedFoodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
