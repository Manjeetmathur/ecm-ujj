import React, { useState } from "react";
import axios from "axios";
import { url } from "../../bacxkendUrl/BackendUrl";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const [image, setImage] = useState("");
  const [postTitle, setpostTitle] = useState("");
  const [postContent, setpostContent] = useState("");
  const [postPrice, setpostPrice] = useState("");
  const [postCategory, setpostCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("postImage", image);
      formData.append("postTitle", postTitle);
      formData.append("postContent", postContent);
      formData.append("postPrice", postPrice);
      formData.append("postCategory", postCategory);
      const  {data}  = await axios.post(`${url}/post/create-post`, formData, {
        headers: { "content-type": "multipart/form-data" },
        withCredentials: true,
        withXRFToken: true,
      });
console.log(data)
      if (data.success) {
        toast.success(data.message);
        setImage("");
        setpostCategory("");
        setpostContent("");
        setpostPrice("");
        setpostTitle("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-600 via-purple-500 to-pink-600 rounded-xl mb-5">
      <div className="w-full max-w-2xl p-6  ">
        <h2 className="text-3xl font-bold  text-center mb-6">Create Post</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload */}
          <div>
            <label htmlFor="postImage" className="block text-sm font-medium text-gray-300">
              Post Image
            </label>
            <input
              type="file"
              id="postImage"
              name="postImage"
              required
              onChange={(e) => setImage(e.target.files?.[0])}
              className="mt-1 w-full px-3 py-2 border   rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Post Title */}
          <div>
            <label htmlFor="postTitle" className="block text-sm font-medium text-gray-300">
              Post Title
            </label>
            <input
              type="text"
              id="postTitle"
              name="postTitle"
              required
              value={postTitle}
              onChange={(e) => setpostTitle(e.target.value)}
              className="mt-1 w-full px-3 py-2 border   rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Post Content */}
          <div>
            <label htmlFor="postContent" className="block text-sm font-medium text-gray-300">
              Post Content
            </label>
            <textarea
              id="postContent"
              name="postContent"
              required
              value={postContent}
              onChange={(e) => setpostContent(e.target.value)}
              className="mt-1 w-full px-3 py-2 border   rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
            />
          </div>

          {/* Post Price */}
          <div>
            <label htmlFor="postPrice" className="block text-sm font-medium text-gray-300">
              Post Price
            </label>
            <input
              type="text"
              id="postPrice"
              name="postPrice"
              required
              value={postPrice}
              onChange={(e) => setpostPrice(e.target.value)}
              className="mt-1 w-full px-3 py-2 border   rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Post Category */}
          <div>
            <label htmlFor="postCategory" className="block text-sm font-medium text-gray-300">
              Post Category
            </label>
            <select
              id="postCategory"
              name="postCategory"
              required
              value={postCategory}
              onChange={(e) => setpostCategory(e.target.value)}
              className="mt-1 w-full px-3 py-2 border   rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select Category</option>
              <option value="smartphones">Smartphones</option>
              <option value="watch">watches</option>
              <option value="earphone">earphones</option>
              <option value="accesories">Accesories</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700  font-bold py-3 px-4 rounded-lg transition"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 "
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Creating...
              </div>
            ) : (
              "Create Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
