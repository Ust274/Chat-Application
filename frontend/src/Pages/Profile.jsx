import React, { useState } from 'react';
import { User, Mail, Calendar, Camera } from 'lucide-react';
import { useAuthStore } from '../Stores/useAuthStore';

const Profile = () => {
  const { userAuth, logout, uploadProfile, isUpdatingProfile } = useAuthStore();
  const [profile, setProfile] = useState("");

  const getprofile = async(e) => {
    try {
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async() => {
        const baseImg = reader.result;
        setProfile(baseImg);
        await uploadProfile({profilePic: baseImg});
      };
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen py-8 px-4 mt-4">
      <div className="max-w-2xl mx-auto rounded-lg shadow">
        {/* Header Section */}
        <div className="relative bg-blue-950 rounded-t-lg p-8 text-center">
          <div className="inline-block relative">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 mx-auto border-4 border-white relative group">
              <img 
                src={ profile || userAuth.profilePic || "pic"}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              {/* Upload Button Overlay */}
              <label 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                htmlFor="profile-upload"
              >
                <Camera className="text-white" size={24} />
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={getprofile}
                  disabled={isUpdatingProfile}
                />
              </label>
              {isUpdatingProfile && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="animate-spin rounded-full h-6 w-6 border-4 border-white"></div>
                </div>
              )}
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-white">
            {userAuth?.fullName || "Your Name"}
          </h1>
        </div>

        {/* Profile Info Section */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center p-3 rounded-lg">
              <User className="text-gray-200 mr-3" size={30} />
              <div>
                <p className="text-sm text-gray-200">Username</p>
                <p className="text-gray-300">{userAuth?.fullName || "Your Name"}</p>
              </div>
            </div>

            <div className="flex items-center p-3 rounded-lg">
              <Mail className="text-gray-200 mr-3" size={30} />
              <div>
                <p className="text-sm text-gray-200">Email</p>
                <p className="text-gray-300">{userAuth?.email || "your.email@example.com"}</p>
              </div>
            </div>

            <div className="flex items-center p-3 rounded-lg">
              <Calendar className="text-gray-200 mr-3" size={30} />
              <div>
                <p className="text-sm text-gray-200">Member Since</p>
                <p className="text-gray-300"> {userAuth?.createdAt ? new Date(userAuth.createdAt).toLocaleDateString() : "2025"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="p-6 border-t">
          <button onClick={logout} className="w-full px-4 py-2 mt-2 text-sm text-red-600 rounded-lg transition-colors">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;