import React, { useEffect, useState } from "react";
import { FETCH_URL, token } from "../../utils/Constants";
import Modal from './Modal';  // Import the Modal component
import { useSelector } from "react-redux";

export default function Beverage() {
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    in_stock: false,
    veg: false,
    img: null,
  });
  const [showModal, setShowModal] = useState(false);
  const {email} = useSelector((state) => state.user)
  const floor = email.split("").splice(5, 2).join("");
  
  const fetchData = async () => {
    try {
      const response = await fetch(`${FETCH_URL}/admin/maindishes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Check for a successful response
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }

      const data = await response.json();

      // Filter for Main Course items first
      const filteredData = data?.filter(
        (item) =>
          item.category === "Beverage" &&
          (floor === "f6"
            ? item.floor === "sixth floor"
            : item.floor === "fourth floor") || ""
      );

      // console.log(filteredData);
      setData(filteredData);
    } catch (error) {
      console.error("There was an error fetching the data:", error);
    }
  };

  const handleEditClick = (item) => {
    setEditMode(item._id);
    setFormData({
      title: item.title,
      price: item.price,
      description: item.description,
      in_stock: item.in_stock,
      veg: item.veg,
      img: null,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0],
    });
  };

  const handleSaveClick = async (id) => {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("in_stock", formData.in_stock);
    formDataToSend.append("veg", formData.veg);
    if (formData.img) {
      formDataToSend.append("img", formData.img);
    }

    await fetch(`${FETCH_URL}/admin/maindishes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataToSend,
    });

    fetchData();
    setShowModal(false);
    setEditMode(null);
  };
  const handleDeleteClick = async (id) => {
    await fetch(`${FETCH_URL}/admin/maindishes/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchData();
    setShowModal(false);
    setEditMode(null);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ml-[240px] p-4">
      <h1 className="text-2xl font-bold mb-4">Beverages</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">In Stock</th>
            <th className="py-2 px-4 border">Hot</th>
            <th className="py-2 px-4 border">Images</th>
            <th className="py-2 px-4 border">Delete</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="py-2 px-4 border">{item.title}</td>
              <td className="py-2 px-4 border">{item.price}</td>
              <td className="py-2 px-4 border">{item.description}</td>
              <td className="py-2 px-4 border">{item.in_stock ? "Yes" : "No"}</td>
              <td className="py-2 px-4 border">{item.veg ? "Yes" : "No"}</td>
              <td className="py-2 px-4 border">
                <img className="h-16 w-16 object-cover object-center rounded-md" src={item.img} alt="" />
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-green-500 text-white py-1 px-3 rounded"
                >
                  Edit
                </button>
              </td>
              <td className="py-2 px-4 border">
              <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="text-red-600 hover:text-red-900 py-1 px-3 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="p-4">
          <h2 className="text-xl mb-4">Edit Beverages</h2>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              <input
                type="checkbox"
                name="in_stock"
                checked={formData.in_stock}
                onChange={handleInputChange}
              />
              In Stock
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              <input
                type="checkbox"
                name="veg"
                checked={formData.veg}
                onChange={handleInputChange}
              />
              Hot
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Image</label>
            <input
              type="file"
              name="img"
              onChange={handleFileChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => handleSaveClick(editMode)}
              className="bg-blue-500 text-white py-1 px-3 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
