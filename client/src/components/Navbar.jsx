import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserNavbar
 = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { user, logout } = useAuth(); // clearUser optional if your logout already clears
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const isLoggedIn = !!user;

  const toggleMenu = () => setShowAccountMenu(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoginLogout = () => {
    setShowAccountMenu(false);
    if (isLoggedIn) {
      // Logout: clear user data, don't navigate
      logout(); 
    } else {
      // Login: navigate to login page
      navigate("/login");
    }
  };

  return (
    <nav className="w-full bg-orange-400 shadow-md px-4 py-3 relative">
      {/* MOBILE */}
      <div className="flex items-center justify-between w-full md:hidden">
        <div className="flex items-center gap-3">
          <button className="text-2xl">☰</button>
          <h2 className="text-xl font-bold text-gray-900">miniEcommerce</h2>
        </div>
        <div className="flex items-center gap-4 text-xl">
          <button onClick={toggleMenu}>👤</button>
          <button>🛒</button>
        </div>
      </div>

      {/* SEARCH (mobile & desktop) */}
      <div className="mt-3 w-full flex md:hidden">
        <input
          type="text"
          placeholder="Search for products..."
          className="flex-1 border border-gray-400 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button className="bg-black text-white px-5 py-2 rounded-r-md">Search</button>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex md:items-center md:justify-between w-full mt-3">
        <div className="flex items-center gap-3">
          <button className="text-2xl">☰</button>
          <h2 className="text-xl font-bold text-gray-900">miniEcommerce</h2>
        </div>
        <div className="flex-1 max-w-2xl mx-6">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 border border-gray-400 px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-white px-5 py-2 rounded-r-md">Search</button>
          </div>
        </div>
        <div className="flex items-center gap-6 text-lg">
          <button
            className="flex items-center gap-2 hover:text-gray-700"
            onClick={toggleMenu}
          >
            <span>👤</span> Account
          </button>
          <button className="flex items-center gap-2 hover:text-gray-700">
            <span>🛒</span> Carts
          </button>
        </div>
      </div>

      {/* ACCOUNT DROPDOWN */}
      <div
        ref={menuRef}
        className={`absolute right-4 top-16 bg-white shadow-lg border-t border-gray-300 rounded-md w-40 py-2 z-50 flex flex-col items-center
          transform transition-all duration-200 origin-top-right
          ${showAccountMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <button
          onClick={handleLoginLogout}
          className="w-[85%] px-4 py-2 text-center hover:bg-orange-500 bg-orange-400 rounded-md m-2"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        {/* Always show buttons */}
        <button className="w-full px-4 py-2 text-left border-t border-gray-300 hover:bg-gray-300">👤 My Account</button>
        <button className="w-full px-4 py-2 text-left hover:bg-gray-300">Orders</button>
        <button className="w-full px-4 py-2 text-left hover:bg-gray-100">Wishlist</button>
      </div>
    </nav>
  );
};

export default UserNavbar
;
