import React from "react";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import HomeLower from "../../HomeMiddle/HomeLower";
import p2 from '../../../assets/p2.webp';
import p4 from '../../../assets/p4.jpg';

const Home = () => {
  const { posts } = useSelector((st) => st.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-400 relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative z-10">
        <div className="w-full">
          <img
            src={"https://miro.medium.com/v2/resize:fit:1358/1*rkqtQq7AC1xac6z10BlmKw.jpeg"}
            alt="Electronics Banner"
            className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover transform hover:scale-105 transition-all duration-700 hidden md:block"
          />
          <img
            src={ "https://miro.medium.com/v2/resize:fit:1358/1*rkqtQq7AC1xac6z10BlmKw.jpeg"}
            alt="Electronics Banner"
            className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover transform hover:scale-105 transition-all duration-700 md:hidden"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/60 via-transparent to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12">
          <div className="text-left max-w-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white  tracking-tight">
              Ujjwal Gadgets
            </h1>
            <p className="mt-3 text-white text-base sm:text-lg md:text-xl font-bold opacity-90">
              Discover the latest in cutting-edge technology
            </p>
            <Link to="/explore">
              <button className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all duration-300 flex items-center gap-2 shadow-md">
                Shop Now <FaLongArrowAltRight />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-gray-800">
        {["watch", "earphone", "smartphones"].map((category) => {
          const categoryPosts = posts?.filter((item) => item.postCategory === category);

          return categoryPosts?.length > 0 ? (
            <div key={category} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 capitalize text-gray-900">
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryPosts?.slice(0, 4).map((item, idx) => (
                  <HomeLower
                    key={idx}
                    className="bg-white text-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    post={item}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Link to="/explore">
                  <button className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all duration-300">
                    See All
                  </button>
                </Link>
              </div>
            </div>
          ) : null;
        })}

        {posts?.length === 0 && (
          <p className="text-center text-gray-600 mt-10 text-lg">No items available at the moment.</p>
        )}
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Spring Tech Sale
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-100 opacity-90">
            Save up to 40% on selected gadgets!
          </p>
          <Link to="/explore">
            <button className="mt-6 px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md">
              Shop Deals Now
            </button>
          </Link>
        </div>
      </div>

      {/* Subtle Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl animate-float"></div>
      <div className="absolute top-20 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-2xl animate-float-slow"></div>
    </div>
  );
};

export default Home;