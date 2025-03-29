import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoReorderThree, IoClose } from "react-icons/io5";
import { FiShoppingCart, FiUser, FiBox } from "react-icons/fi";
import { logout } from "../../store/authSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { url } from "../bacxkendUrl/BackendUrl";
import p1 from "../../assets/p1.jpg";
import { CiHome } from "react-icons/ci";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, admin, userInfo } = useSelector((st) => st.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      dispatch(logout());
      navigate("/login")
      const { data } = await axios.get(`${url}/user/logout`, { withCredentials: true });
      if (data.success) {
        dispatch(logout());
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <header className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-400 shadow-md sticky top-0 z-50 border-b border-gray-300/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={p1} alt="Logo" className="w-[50px] rounded-full border-2 border-white shadow-sm" />
          <span className="text-xl font-bold text-gray-800 drop-shadow-md">TechTrend</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-purple-600 transition font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-purple-600 transition font-medium">About</Link>
          {status && !admin && (
            <Link to={`/profile/${userInfo._id}`} className="text-gray-700 hover:text-purple-600 transition font-medium">Profile</Link>
          )}
          {status && !admin && (
            <Link to="/order-page" className="text-gray-700 hover:text-purple-600 transition font-medium">Orders</Link>
          )}
          {status && !admin && (
            <Link to="/cart" className="text-gray-700 hover:text-purple-600 transition flex items-center font-medium">
              <FiShoppingCart className="mr-1" /> Cart
            </Link>
          )}
          {admin && (
            <Link to="/admin" className="text-gray-700 hover:text-purple-600 transition font-medium">Dashboard</Link>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {status ? (
            <button
              onClick={logoutHandler}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center shadow-md"
            >
              <FiUser className="mr-2" /> Logout
            </button>
          ) : (
            <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center shadow-md">
              <FiUser className="mr-2" /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-gray-800 text-3xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <IoClose /> : <IoReorderThree />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 border-t border-gray-200 px-6 py-4 shadow-md">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition font-medium" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 transition font-medium" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            {status && !admin && (
              <Link to={`/profile/${userInfo._id}`} className="text-gray-700 hover:text-purple-600 transition font-medium" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
            )}
            {status && !admin && (
              <Link to="/order-page" className="text-gray-700 hover:text-purple-600 transition font-medium" onClick={() => setIsMenuOpen(false)}>
                Orders
              </Link>
            )}
            {status && !admin && (
              <Link to="/cart" className="text-gray-700 hover:text-purple-600 transition flex items-center font-medium" onClick={() => setIsMenuOpen(false)}>
                <FiShoppingCart className="mr-1" /> Cart
              </Link>
            )}
            {admin && (
              <Link to="/admin" className="text-gray-700 hover:text-purple-600 transition font-medium" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
            )}
            {status ? (
              <button
                onClick={() => {
                  logoutHandler();
                  setIsMenuOpen(false);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center shadow-md"
              >
                <FiUser className="mr-2" /> Logout
              </button>
            ) : (
              <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center shadow-md" onClick={() => setIsMenuOpen(false)}>
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