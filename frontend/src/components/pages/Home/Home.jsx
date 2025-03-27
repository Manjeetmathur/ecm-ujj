import React from "react";
import { IoCart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import HomeLower from "../../HomeMiddle/HomeLower";
import p2 from '../../../assets/p2.webp'

const Home = () => {
  const { posts } = useSelector((st) => st.auth);

  return (
    <div
      className="min-h-screen bg-gradient-to-l from-blue-900 via-gray-800 to-gray-950 relative overflow-hidden"

    >
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black opacity-5 pointer-events-none"></div>

      {/* Hero Section */}
      <div className="relative overflow-hidden z-10">
        <div className="w-full">
          <img
            src={p2||"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"}
            alt="Electronics Banner"
            className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cove transform hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-transparent"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12">
          <div className="text-left max-w-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight drop-shadow-md">
              Next-Gen Ujjwal-Gadgets
            </h1>
            <p className="mt-2 text-base sm:text-lg md:text-xl text-gray-200 opacity-90 drop-shadow-sm">
              Upgrade your tech with cutting-edge electronics
            </p>
            <Link to="/explore">
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg">
                Shop Now <FaLongArrowAltRight />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="mx-auto px-4 mt-6 text-white">
        {["watch", "earphone", "smartphones"].map((category) => {
          const categoryPosts = posts?.filter((item) => item.postCategory === category);

          return categoryPosts?.length > 0 ? (
            <div key={category} className="mb-10">
              <h2 className="text-2xl font-bold mb-4 capitalize">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryPosts?.slice(0, 4).map((item, idx) => (
                  <HomeLower
                    key={idx}
                    className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                    post={item}
                  />
                ))}
               
              </div> <button className="flex justify-center items-center place-content-center mx-auto"><Link to={"/explore"}
              className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-all duration-300 text-s font-medium disabled:bg-blue-400 disabled:cursor-not-allowed px-3 my-4 text-lg">see all</Link></button>
            </div>
          ) : null;
        })}

        {posts?.length === 0 && (
          <p className="text-center text-gray-400 mt-10 text-lg">No items available.</p>
        )}
      </div>


      {/* Latest Products Section */ }
  

  {/* Promotional Banner */ }
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 relative z-10">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold drop-shadow-md">
        Spring Tech Sale
      </h2>
      <p className="mt-2 text-base sm:text-lg opacity-90 drop-shadow-sm">
        Up to 40% off on selected gadgets!
      </p>
      <Link to="/explore">
        <button className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
          Shop Deals Now
        </button>
      </Link>
    </div>
  </div>

  {/* Animated Accents */ }
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
    </div >
  );
};

export default Home;