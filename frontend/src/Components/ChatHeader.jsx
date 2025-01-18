import React from 'react';
import { useMessageStore } from '../Stores/useMessageStore.js';
import { UserCircle } from 'lucide-react';
import { useAuthStore } from '../Stores/useAuthStore.js';


const ChatHeader = () => {
  const { selectedUser } = useMessageStore();
  const {onlineUsers } = useAuthStore();

  return (
  <>
    <div className="h-full w-full px-3 py-4 flex flex-col text-white">
      <div className="flex items-center gap-3">
      {selectedUser?.profilePic ? (
              <img
                src={selectedUser.profilePic}
                alt={`${selectedUser.fullName}'s profile`}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <UserCircle size={38} />
            )}
         <div>
            <h2 className="font-semibold">{selectedUser.fullName}</h2>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
      </div>
    </div>
    </>
  );
};

export default ChatHeader;
