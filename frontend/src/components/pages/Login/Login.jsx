import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login, setAdmin } from "../../../store/authSlice";
import toast from "react-hot-toast";
import { url } from "../../bacxkendUrl/BackendUrl";

const Login = () => {
       const { status } = useSelector((st) => st.auth);
       const navigate = useNavigate();
       const dispatch = useDispatch();

       useEffect(() => {
              if (status) {
                     navigate("/");
              }
       }, [status, navigate]);

       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [loading, setLoading] = useState(false);

       const handleLogin = async (e) => {
              e.preventDefault();
              try {
                     setLoading(true);
                     const data = await axios.post(
                            `${url}/user/login`,
                            { email, password },
                            {
                                   headers: {
                                          "content-type": "application/json",
                                   },
                                   withCredentials: true,
                            }
                     );
                     const response = data.data;
                     if (response.success) {
                            if (response.role === "admin") {
                                   dispatch(setAdmin(response.role));
                            }
                            dispatch(login(response.loggedInUser));
                            toast.success(response.message);
                            navigate("/");
                     } else {
                            toast.error(response.message);
                     }
              } catch (error) {
                     toast.error(error.message);
              } finally {
                     setLoading(false);
              }
       };

       return (
              <div
                     className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-600 to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
                    
              >
                     {/* Subtle Overlay Effect */}
                     <div className="absolute inset-0 bg-black opacity-10 pointer-events-none"></div>

                     <div className="bg-gray-600 shadow-2xl rounded-xl p-8 max-w-md w-full space-y-8 transform hover:shadow-3xl transition-shadow duration-300 z-10 relative">
                            {/* Glow Effect Behind Form */}
                            <div className="absolute inset-0 -z-10 bg-blue-500/20 blur-3xl rounded-xl scale-105 animate-pulse-slow"></div>

                            {/* Logo or Branding */}
                            <div className="text-center">
                                   <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
                                          TechTrend Login
                                   </h2>
                                   <p className="mt-2 text-sm text-gray-300 drop-shadow-sm">
                                          Access your electronics shopping experience
                                   </p>
                            </div>

                            {/* Form Container */}
                            <div className="space-y-6">
                                   {/* Form */}
                                   <form onSubmit={handleLogin} className="space-y-6">
                                          {/* Email Field */}
                                          <div>
                                                 <label
                                                        htmlFor="email"
                                                        className="block text-sm font-medium text-white drop-shadow-sm"
                                                 >
                                                        Email Address
                                                 </label>
                                                 <input
                                                        id="email"
                                                        type="email"
                                                        placeholder="you@example.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        required
                                                        className="mt-1 w-full px-4 py-3 bg-gray-100/80 border border-gray-400/50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 shadow-inner"
                                                 />
                                          </div>

                                          {/* Password Field */}
                                          <div>
                                                 <label
                                                        htmlFor="password"
                                                        className="block text-sm font-medium text-white drop-shadow-sm"
                                                 >
                                                        Password
                                                 </label>
                                                 <input
                                                        id="password"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                        className="mt-1 w-full px-4 py-3 bg-gray-100/80 border border-gray-400/50 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 shadow-inner"
                                                 />
                                          </div>

                                          {/* Submit Button */}
                                          <button
                                                 type="submit"
                                                 className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 text-base font-semibold disabled:bg-blue-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                                 disabled={loading}
                                          >
                                                 {loading ? "Signing In..." : "Sign In"}
                                          </button>
                                   </form>

                                   {/* Sign Up Link */}
                                   <p className="text-center text-sm text-gray-300 drop-shadow-sm">
                                          New to TechTrend?{" "}
                                          <Link
                                                 to="/signup"
                                                 className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                                          >
                                                 Create an Account
                                          </Link>
                                   </p>
                            </div>
                     </div>

                     {/* Optional Animated Accent */}
                     <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
                     <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
              </div>
       );
};

export default Login;