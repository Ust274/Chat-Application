import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Profile from "./Pages/profile";
import { Loader } from 'lucide-react';
import { useAuthStore } from "./Stores/useAuthStore.js";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';

function App() {
  const { userAuth, isCheckingAuth, checkAuth } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={userAuth ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!userAuth ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!userAuth ? <Login /> : <Navigate to="/" />} />
        <Route path="/Profile" element={userAuth ? <Profile /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;