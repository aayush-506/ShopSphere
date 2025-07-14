import React from 'react';
import assets from '../assets/admin_assets/assets.js';
import { NavLink, Link } from 'react-router-dom';

const Navbar = ({settoken}) => {
  const navLinks = [
    { label: 'ADD ITEMS', path: '/add' },
    { label: 'LIST ITEMS', path: '/list' },
    // { label: 'ORDERS', path: '/orders' },
  ];

  return (
     <div className="flex items-center justify-between py-5 px-16 font-medium ">

  
      <Link to="/add">
        <img src={assets.logo} className="w-36" alt="Logo" />
      </Link> 

      <ul className="flex gap-6 text-zinc-700">
        {navLinks.map((link, index) => (
          <NavLink key={index} to={link.path}>
            {({ isActive }) => (
              <div
                className={`flex flex-col items-center text-sm hover:text-black ${
                  isActive ? 'text-black font-semibold' : ''
                }`}
              >
                <p>{link.label}</p>
                <hr
                  className={`w-2/4 border-b-2 rounded-md transition-all duration-200 ${
                    isActive ? 'block border-black' : 'hidden'
                  }`}
                />
              </div>
            )}
          </NavLink>
        ))}
      </ul>

      <button onClick={()=>settoken(' ')} className="bg-red-500 cursor-pointer text-white text-sm px-4 py-1.5 rounded-md hover:bg-red-600 transition-all duration-200">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
