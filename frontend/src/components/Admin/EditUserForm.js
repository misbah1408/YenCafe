import React, { useState } from "react";

export default function EditUserForm({ user, onClose, onSave }) {
  const [campusId, setCampusId] = useState(user.campusId);
  const [email, setEmail] = useState(user.email);

  const handleSave = () => {
    onSave({ ...user, campusId, email });
    // console.log(id)
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
           Campus Id
          </label>
          <input
            type="number"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={campusId}
            onChange={(e) => {
              setCampusId(e.target.value)
              // console.log(e.target.value)
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
