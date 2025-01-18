import React, { useEffect, useRef } from 'react';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import { useMessageStore } from '../Stores/useMessageStore.js';
import { useAuthStore } from '../Stores/useAuthStore.js';
import { Loader } from 'lucide-react'; // If you are using this icon
import {formatMessageTime} from '../utils/Format.js';
const ChatContainer = () => {
  const { messages, getMessages, selectedUser, isMessageLoading,connectToMessages,disconnectFromMessages } = useMessageStore();
  const { userAuth } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
    connectToMessages();

    return () => disconnectFromMessages();
  }, [selectedUser._id, getMessages, connectToMessages, disconnectFromMessages]);

  useEffect(() => {
    if(Messageref.current && messages){
      Messageref.current.scrollIntoView({ behavior: "smooth" });  // Scroll to bottom when new message is added
    }

  },[messages]);

  const Messageref = useRef(null);

  if (isMessageLoading) {
    return (
      <div className="h-full w-full">
        <ChatHeader />
        <div className="flex items-center justify-center h-full">
          <Loader className="w-10 h-10 animate-spin" />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="h-20 w-full bg-slate-900 px-6 flex items-center">
        <ChatHeader />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 m">
        <div>
          {messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === userAuth._id ? 'chat-end' : 'chat-start'}`}
              ref={Messageref}
            >
              {/* Displaying message content */}
              {message.text && 
              <div className="chat-bubble bg-black">
                {message.text}
               </div>
              }
               <time className='chat-footer mb-1'>
                 {formatMessageTime(message.createdAt)}
                </time>
              {message.image && (
                <div className="chat-bubble bg-black flex flex-col">
                  <img src={message.image} alt="Message" className="w-20 h-20 object-cover rounded-lg" />
                    
                </div>
              )}
            </div>
            
          ))}
        </div>
      </div>

      {/* Message Input Area */}
      <div className="px-2 py-2 bg-slate-900">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
