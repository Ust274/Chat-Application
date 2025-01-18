import React from 'react';
import { useState } from 'react';
import { useAuthStore } from '../Stores/useAuthStore';

const Login = () => {
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };


  return (
    <div className="text-white flex justify-center items-center min-h-screen bg-gray-800">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-gray-700 rounded">
        <input 
          type="email" 
          placeholder="Email" 
          className="px-10 py-2 rounded bg-gray-800 text-white"
          required 
          onChange={(e) =>setFormData({...formData,email: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="px-10 py-2 rounded bg-gray-800 text-white"
          required 
          onChange={(e) =>setFormData({...formData,password: e.target.value})}
        />
        <button 
          type="submit" 
          className="px-5 py-3 bg-blue-500 rounded text-white"
        >
          Login
        </button>
        <p className="text-sm">
          Don't have an account? <a href="/Signup" className="text-blue-400">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
