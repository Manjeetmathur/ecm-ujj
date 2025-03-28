import React, { useState } from "react";
import { useSelector } from "react-redux";
import HomeLower from "../HomeMiddle/HomeLower";

const Explore = () => {
  const [cat, setCat] = useState("all");
  const { posts } = useSelector((st) => st.auth);

  const categories = [
    { label: "All", value: "all" },
    { label: "Smartphones", value: "smartphones" },
    { label: "Watches", value: "watch" },
    { label: "Earphones", value: "earphone" },
    { label: "Accessories", value: "accessories" },
  ];

  const filteredPosts = posts?.filter((item) =>
    cat === "all" ? true : item.postCategory === cat
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 py-12 px-4 relative overflow-hidden">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-4 mb-6 border-b-2 border-gray-300">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => setCat(category.value)}
            className={`px-4 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 shadow-md min-w-max whitespace-nowrap 
              ${
                cat === category.value
                  ? "bg-pink-600 text-white shadow-lg"
                  : "bg-purple-300 text-gray-800 hover:bg-pink-500 hover:text-white hover:shadow-lg"
              } backdrop-blur-sm`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="bg-white rounded-xl p-5 shadow-md">
        {filteredPosts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPosts.map((item) => (
              <HomeLower key={item._id} post={item} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg py-10">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;