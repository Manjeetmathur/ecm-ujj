import React, { useState } from "react";
import { useSelector } from "react-redux";
import HomeLower from "../HomeMiddle/HomeLower";

const Explore = () => {
  const [cat, setCat] = useState("all");
  const { posts } = useSelector((st) => st.auth);

  // Updated categories for an electronics theme
  const categories = [
    { label: "All", value: "all" },
    { label: "Smartphones", value: "smartphones" },
    { label: "watch", value: "watch" },
    { label: "earphones", value: "earphone" },
    { label: "Accessories", value: "accessories" },
  ];

  const filteredPosts = posts?.filter((item) => {
    if (cat === "all") return true;
    return item.postCategory === cat;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-12  relative overflow-hidden">
      {/* Subtle Texture Overlay */}
      <div
        className="absolute inset-0 bg-no-repeat bg-[length:150px_150px] opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='25' cy='25' r='2'/%3E%3Ccircle cx='125' cy='125' r='2'/%3E%3Ccircle cx='75' cy='75' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Container */}
      <div className="container mx-auto relative z-10 ">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 px-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setCat(category.value)}
              className={`px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 shadow-md ${
                cat === category.value
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-700/50 text-gray-300 hover:bg-blue-500 hover:text-white hover:shadow-lg"
              } backdrop-blur-sm`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="bg-gray-800/30 rounded-xl p-3 backdrop-blur-md shadow-lg">
          {filteredPosts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((item) => (
                <HomeLower key={item._id} post={item} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-300 text-lg lg:text-xl py-10">
              No products found in this category.
            </div>
          )}
        </div>
      </div>

      {/* Animated Accents */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-float-slow"></div>
    </div>
  );
};

export default Explore;