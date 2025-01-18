import React from 'react';
import { useAuthStore } from '../Stores/useAuthStore';
import { useState } from 'react';
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };
  return (
    <div className="text-white flex justify-center items-center min-h-screen bg-gray-800">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-gray-700 rounded ">
        <input 
          type="text" 
          placeholder="Guest" 
          className="px-10 py-2 rounded bg-gray-800 text-white"
          required 
          value={formData.fullName}
          onChange={(e) => setFormData({...formData,fullName : e.target.value})}
        />
        <input 
          type="email" 
          placeholder="email" 
          className="px-10 py-2 rounded bg-gray-800 text-white"
          required 
          value={formData.email}
          onChange={(e) => setFormData({...formData,email : e.target.value})}
        />
        <input 
          type="text" 
          placeholder="************" 
          className="px-10 py-2 rounded bg-gray-800 text-white"
          required 
          value={formData.password}
          onChange={(e) => setFormData({...formData,password : e.target.value})}
        />
        <button 
          type="submit" 
          className="px-5 py-3 bg-blue-500 rounded text-white"
        >
          Create Account
        </button>
        <p className="text-sm">
          Already have an account? <a href="/Login" className="text-blue-400">Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
