import React from 'react';
import { BsFillChatLeftQuoteFill } from "react-icons/bs";



const EmptyChat = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
            <span>
                <BsFillChatLeftQuoteFill  className='animate-bounce w-10 h-10' size={24} />
            </span>
    </div>
  );
};

export default EmptyChat;