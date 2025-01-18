import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut, MessageSquare, UserRound } from 'lucide-react';
import { useAuthStore } from '../Stores/useAuthStore';

const Navbar = () => {
  const { userAuth, logout } = useAuthStore();
  
  return (
    <>
      {/* Desktop navbar (vertical) */}
      <div className='hidden md:block h-screen w-16 fixed left-0 top-0 bg-blue-950'>
        <div className='flex flex-col items-center gap-8 pt-8 text-white'>
          {userAuth && (
            <>
              <Link to="/" className='hover:text-green-500 transition-colors'>
                <MessageSquare size={24} />
              </Link>
              <Link to="/Profile" className='hover:text-green-500 transition-colors'>
                <UserRound size={24} />
              </Link>
              <Link onClick={logout} className='hover:text-green-500 transition-colors'>
                <LogOut size={24} />
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile navbar (horizontal) */}
      <div className='md:hidden fixed top-0 left-0 right-0 h-10 bg-blue-950'>
        <div className='flex justify-center items-center h-full text-white'>
          {userAuth && (
            <div className='flex gap-16'>
              <Link to="/" className='hover:text-green-500 transition-colors'>
                <MessageSquare size={24} />
              </Link>
              <Link to="/Profile" className='hover:text-green-500 transition-colors'>
                <UserRound size={24} />
              </Link>
              <Link onClick={logout} className='hover:text-green-500 transition-colors'>
                <LogOut size={24} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar