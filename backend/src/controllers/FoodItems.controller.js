import { MainDishe } from "../models/Dishes.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

export const createFoodItem = async (req, res) => {
  const { category, title, price, veg, description, in_stock, floor } = req.body;

  if (
    !category ||
    !title ||
    !price ||
    veg === undefined ||
    !description ||
    in_stock === undefined ||
    !floor
  ) {
    console.log("Validation failed: Missing fields in request body");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    let img;
    if (req.file) {
      console.log("File received:", req.file);

      // Attempt Cloudinary upload
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      if (!cloudinaryResponse) {
        console.error("Cloudinary upload failed");
        return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
      }
      img = cloudinaryResponse.secure_url;
    } else {
      console.log("No file provided in request");
      return res.status(400).json({ message: "Image is required" });
    }

    // Attempt to save to database
    const newMainDish = new MainDishe({
      category,
      title,
      price,
      veg,
      description,
      in_stock,
      img,
      floor
    });
    await newMainDish.save();
    // console.log("Food item saved successfully:", newMainDish);

    res.status(201).json(newMainDish);
  } catch (error) {
    console.error("Server error during createFoodItem:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get all food items
export const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await MainDishe.find();
    req.io.emit('updateData', foodItems);
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
  // console.log(title)

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
