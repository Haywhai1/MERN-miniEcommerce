import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  ShoppingBagIcon,
  HeartIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const Navbar = ({
  themeColor = "orange",
  loginPath = "/login",
  brand = "miniEcommerce",
  className = "",
}) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const isLoggedIn = !!user;

  const toggleMenu = () => setShowAccountMenu((prev) => !prev);

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
    if (isLoggedIn) logout();
    else navigate(loginPath);
  };

  // Map themeColor prop to Tailwind bg classes for button
  const colorMap = {
    orange: "bg-orange-400 hover:bg-orange-500",
    green: "bg-green-500 hover:bg-green-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-500 hover:bg-gray-600",
  };

  const buttonColorClasses = colorMap[themeColor] || colorMap.orange;

  return (
    <nav
      className={`w-full shadow-md px-4 py-3 z-50 ${className}`}
      style={{ backgroundColor: themeColor }}
    >
      {/* MOBILE */}
      <div className="flex items-center justify-between w-full md:hidden">
        <div className="flex items-center gap-3">
          <Bars3Icon className="w-7 h-7 text-black" />
          <h2 className="text-xl font-bold text-gray-900">{brand}</h2>
        </div>

        <div className="flex items-center gap-4 text-xl">
          <button onClick={toggleMenu}>
            <UserIcon className="w-6 h-6 text-black" />
          </button>
          <ShoppingCartIcon className="w-6 h-6 text-black" />
        </div>
      </div>

      {/* Searchbar Mobile */}
      <div className="mt-3 w-full flex md:hidden">
        <input
          type="text"
          placeholder="Search for products..."
          className="flex-1 border border-gray-400 px-3 py-2 rounded-l-md"
        />
        <button className="bg-black text-white px-5 py-2 rounded-r-md">
          Search
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between w-full mt-3">
        <div className="flex items-center gap-3">
          <Bars3Icon className="w-7 h-7 text-black" />
          <h2 className="text-xl font-bold text-gray-900">{brand}</h2>
        </div>

        <div className="flex-1 max-w-xl mx-6">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="flex-1 border border-gray-400 px-3 py-2 rounded-l-md"
            />
            <button className="bg-black text-white px-5 py-2 rounded-r-md">
              Search
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={toggleMenu} className="flex items-center gap-1">
            <UserIcon className="w-5 h-5 text-black" />
            Account
          </button>

          <button className="flex items-center gap-1">
            <ShoppingCartIcon className="w-5 h-5 text-black" />
            Carts
          </button>
        </div>
      </div>

      {/* Dropdown */}
      <div
        ref={menuRef}
        className={`absolute right-4 top-20 bg-white shadow-lg border rounded-md w-48 py-2 z-50 transition-all duration-200 ${
          showAccountMenu
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <button
          onClick={handleLoginLogout}
          className={`w-[85%] px-4 py-2 text-center rounded-md m-2 text-white transition ${buttonColorClasses}`}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        <button
          className={`w-full px-4 py-2 text-left border-t hover:bg-gray-300 flex gap-2 ${
            !isLoggedIn && "opacity-50 cursor-not-allowed"
          }`}
        >
          <UserIcon className="w-5 h-5" /> My Account
        </button>

        <button
          className={`w-full px-4 py-2 text-left hover:bg-gray-300 flex gap-2 ${
            !isLoggedIn && "opacity-50 cursor-not-allowed"
          }`}
        >
          <ShoppingBagIcon className="w-5 h-5" /> Orders
        </button>

        <button
          className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex gap-2 ${
            !isLoggedIn && "opacity-50 cursor-not-allowed"
          }`}
        >
          <HeartIcon className="w-5 h-5" /> Wishlist
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
