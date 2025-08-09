import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user", 
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        formData
      );

      console.log("Login success:", res.data);
      login(res.data); 
      navigate("/");

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded px-4 py-2 dark:bg-gray-700 dark:text-white"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded px-4 py-2 dark:bg-gray-700 dark:text-white"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full border rounded px-4 py-2 dark:bg-gray-700 dark:text-white"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="user">Candidate</option>
          <option value="admin">Recruiter</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-700 dark:text-gray-300">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
