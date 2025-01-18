import React, { useState } from 'react';
import Sidebar from '../Components/sidebar';
import { Menu, X } from 'lucide-react';
import ChatContainer from '../Components/ChatContainer';
import { useMessageStore } from '../Stores/useMessageStore';
import EmptyChat from '../Components/EmptyChat';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { selectedUser } = useMessageStore();

  // Function to handle user selection and sidebar collapse
  const handleUserSelection = () => {
    if (window.innerWidth < 768) { // Only collapse on mobile
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="relative mx-auto h-[calc(100vh-4rem)] w-full md:w-4/5 mt-11 mb-0 bg-blue-950 rounded-lg shadow-white border-2 border-slate-600">
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-16 right-4 z-[60] p-2 bg-blue-900 rounded-lg text-white hover:bg-blue-800 transition-colors"
        aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex h-full relative">
        {/* Sidebar - Collapsible on mobile */}
        <div
          className={`
            fixed md:relative
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
            w-4/5 sm:w-3/5 md:w-1/4
            h-[calc(100vh-4rem)]
            transition-transform duration-300 ease-in-out
            border-r border-blue-50
            bg-blue-950
            z-50
          `}
        >
          <Sidebar onUserSelect={handleUserSelection} />
        </div>

        {/* Overlay - Only visible on mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <div className="flex-1 w-full md:w-3/4 h-full relative">
          {selectedUser ? <ChatContainer /> : <EmptyChat />}
        </div>
      </div>
    </div>
  );
};

export default Home;