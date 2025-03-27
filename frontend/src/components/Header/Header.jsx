import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoReorderThree, IoClose } from "react-icons/io5";
import { FiShoppingCart, FiUser, FiBox } from "react-icons/fi";
import { logout } from "../../store/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";
import p1 from "../../assets/p1.jpg"
import { CiHome } from "react-icons/ci";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, admin } = useSelector((st) => st.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const data = await axios.get(`${url}/user/logout`, {
        withCredentials: true,
        withXSRFToken: true,
      });
      const res = data.data;

      if (res.success) {
        dispatch(logout());
        toast.success(res.message);
        navigate("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={p1} alt="" className="w-[56px] md:w-[66px] rounded-2xl" />
          <span className="text-2xl md:text-3xl font-bold tracking-tight">
            TechTrend
          </span>
          
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/"
            className="text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500 pb-1 transition-all duration-300 flex justify-center items-center gap-2"
          >
          <CiHome /> Home
          </Link>
          {status && !admin && (
            <Link
              to="/order-page"
              className="text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500 pb-1 transition-all duration-300 flex items-center"
            >
              <FiBox className="mr-2" /> Orders
            </Link>
          )}
          {status && !admin && (
            <Link
              to="/cart"
              className="text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500 pb-1 transition-all duration-300 flex items-center"
            >
              <FiShoppingCart className="mr-2" /> Cart
            </Link>
          )}
          {admin && (
            <Link
              to="/admin"
              className="text-gray-300 hover:text-white hover:border-b-2 hover:border-blue-500 pb-1 transition-all duration-300"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          {status ? (
            <button
              onClick={logoutHandler}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-all duration-300 flex items-center"
            >
              <FiUser className="mr-2" /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-all duration-300 flex items-center"
            >
              <FiUser className="mr-2" /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-gray-300 hover:text-white text-3xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <IoClose /> : <IoReorderThree />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800 px-4 py-6 animate-slide-down">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-300 flex  items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <CiHome /> Home
            </Link>
            {status && !admin && (
              <Link
                to="/order-page"
                className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiBox className="mr-2" /> Orders
              </Link>
            )}
            {status && !admin && (
              <Link
                to="/cart"
                className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiShoppingCart className="mr-2" /> Cart
              </Link>
            )}
            {admin && (
              <Link
                to="/admin"
                className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {status ? (
              <button
                onClick={() => {
                  logoutHandler();
                  setIsMenuOpen(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-all duration-300 text-left flex items-center"
              >
                <FiUser className="mr-2" /> Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-all duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUser className="mr-2" /> Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;