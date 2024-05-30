import React, { useState } from "react";
import { FETCH_URL, token } from "../../utils/Constants";

const CreateFoodItem = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    price: "",
    veg: false,
    description: "",
    in_stock: false,
    img: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "img") {
      setFormData({ ...formData, img: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    for (const key in formData) {
      if (!formData[key] && key !== "veg" && key !== "in_stock") {
        alert("All fields are required");
        return;
      }
    }
  
    // Client-side validation for file size (10MB limit)
    if (formData.img && formData.img.size > 10 * 1024 * 1024) {
      alert("File size exceeds the 10MB limit");
      return;
    }
  
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    // console.log(formData)
    try {
      const response = await fetch(`${FETCH_URL}/create/item`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      // console.log(result);
  
      // Alert success message and reset form data
      alert("Item created successfully");
      setFormData({
        category: "",
        title: "",
        price: "",
        veg: false,
        description: "",
        in_stock: false,
        img: null,
      });
    } catch (error) {
      console.error("There was an error creating the food item!", error);
    }
  };
  

  return (
    <div className="w-[100%] ml-[290px] flex justify-center p-3 items-start">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-[60%] mx-auto bg-white p-8 rounded-lg shadow-equal"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Food Item
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category:
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Category</option>
            <option value="Main Course">Main Course</option>
            <option value="Break fast">Break Fast</option>
            <option value="Beverage">Beverage</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex gap-3">
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="veg"
              id="veg"
              checked={formData.veg}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="veg"
            >
              Veg or Hot or Chocolate ( <small>if Non-Veg leave it blank</small> )
            </label>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="in_stock"
              id="in_stock"
              checked={formData.in_stock}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="in_stock"
            >
              Stock
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="img"
          >
            Image:
          </label>
          <input
            type="file"
            name="img"
            id="img"
            onChange={handleChange}
            required
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          Create Food Item
        </button>
      </form>
    </div>
  );
};

export default CreateFoodItem;
