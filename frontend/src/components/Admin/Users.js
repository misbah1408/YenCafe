import React, { useEffect, useState } from 'react'
import { token } from '../../utils/Constants';

export default function Users() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      // Make a GET request to the /users endpoint
      const response = await fetch('http://localhost:5000/api/v1/users',{
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
})

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      // Parse the response body as JSON
      const data = await response.json();
      console.log(data)
      // Set the fetched users data in the state
      setUsers(data);
    } catch (error) {
      // Set the error state if an error occurs
      console.error(error)
    }}
  useEffect(()=>{
    fetchUsers();
  },[])
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}
