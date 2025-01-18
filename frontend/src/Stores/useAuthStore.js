import { create } from 'zustand';
import { axiosCon } from '../utils/axios.js';
import { toast } from 'react-hot-toast';
import {io} from 'socket.io-client'


const base_url = import.meta.env.MODE === "development" ? "http://localhost:3000/" : "/"

export const useAuthStore = create((set,get) => ({
  userAuth: null,
  isSigning: false,
  isLoginning: false,
  isCheckingAuth: false,
  isUpdatingProfile: false,
  socket:null,
  onlineUsers: [], 

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosCon.get("/auth/check");
      if (res.data.error) {
        throw new Error(res.data.message);
      }
      set({ userAuth: res.data.user }); 
      get().connectSocket();// Store only the user object
    }
    catch (err) {
      console.error('Auth check failed:', err);
      set({ userAuth: null });
    }
    finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigning: true });
    try {
      const res = await axiosCon.post("/auth/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (res.data.error) {
        throw new Error(res.data.message);
      }
      
      set({ userAuth: res.data.user }); // Store only the user object
      toast.success(res.data.message || "Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Signup failed");
      throw error; // Rethrow to handle in the component if needed
    } finally {
      set({ isSigning: false });
    }
  },

  login: async (data) => {
    set({ isLoginning: true });
    try {
      const res = await axiosCon.post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (res.data.error) {
        throw new Error(res.data.message);
      }
      
      set({ userAuth: res.data.user }); // Store only the user object
      toast.success(res.data.message || "Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Login failed");
      throw error; // Rethrow to handle in the component if needed
    } finally {
      set({ isLoginning: false });
    }
  },


  uploadProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosCon.put("/auth/getProfile", data);
      set({userAuth: res.data});
      toast.success(res.data.message || "Profile uploaded successfully");
      
      if (res.data.error) {
        throw new Error(res.data.message);
      }
      
      toast.success(res.data.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Profile update failed");
    } finally {
      set({ isUploading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosCon.post("/auth/logout");
      set({ userAuth: null });
      toast.success(res.data.message || "Logged out successfully");
      get().disconnectSocket(); // Store only the user object
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Logout failed");
    }
  },

  connectSocket :  () => {

    const {userAuth} = get()
    if(!userAuth || get().socket?.connected) return;
    const socket = io(base_url,{ 
      query:{ userId : userAuth._id,},
    });
    socket.connect();
    set({socket: socket});

    socket.on('getOnlineUsers', (userIds) => {
      set({onlineUsers: userIds});
    });
  },
  disconnectSocket : () => {
    if(get().socket?.connected) get().socket.disconnect();
  }
}));