import React, { useEffect } from 'react';
import { useMessageStore } from '../Stores/useMessageStore.js';
import { UserCircle2 } from 'lucide-react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import {useAuthStore} from "../Stores/useAuthStore.js";

const Sidebar = () => {
  const { users, getUsers, isUserLoading,setSelectedUser} = useMessageStore();
  // const {onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-900">
        <div className="animate-spin text-slate-400">
          <AiOutlineLoading3Quarters size={28} />
        </div>
      </div>
    );
  }


  return (
    <div className="h-full bg-slate-900">
      <div>
        <div className="flex items-center gap-2 px-2 py-3 hover:bg-blue-950 cursor-pointer">
          <UserCircle2 size={24} className="text-slate-400" />
          <span className="text-slate-300">All Users</span>
        </div>
      </div>
      <div className="flex flex-col h-full overflow-y-auto">
      {users.map(user => (
              <div 
                className="w-full border border-gray-500 shadow-lg shadow-black bg-black rounded-md" 
                key={user._id}
                onClick={() => setSelectedUser(user)}
              >
                <div className="h-20 flex items-center gap-2 px-2 py-3 hover:bg-blue-950 cursor-pointer ">
                {user?.profilePic ? (
              <img
                src={user.profilePic}
                alt={`${user.fullName}'s profile`}
                className="w-10 h-10 rounded-full"
              />
                  ) : (
                    <UserCircle2 size={24} />
                  )}
                  <span className="text-slate-300">{user.fullName}</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Sidebar;