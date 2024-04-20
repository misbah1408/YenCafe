import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate('/login')
    }
  return (
    <div>
      <button className="h-3 w-8" onClick={handleLogin}>Click me</button>
    </div>
  );
}
