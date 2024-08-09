import React, { useEffect, useState } from "react";
import { FETCH_URL, token } from "../../utils/Constants";
import EditUserForm from "./EditUserForm";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditPopupOpen(true);
  };

  const handleClose = () => {
    setIsEditPopupOpen(false);
    setSelectedUser(null);
  };

  const handleSave = async (updatedUser) => {
    try {
      const response = await fetch(`${FETCH_URL}/users/update/${updatedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${FETCH_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      const filtedData = data?.filter((user) => !user.isAdmin);
      setUsers(filtedData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${FETCH_URL}/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Users</h2>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campus Id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Update
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.campusId || user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onDoubleClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditPopupOpen && (
        <EditUserForm user={selectedUser} onClose={handleClose} onSave={handleSave} />
      )}
    </div>
  );
}
