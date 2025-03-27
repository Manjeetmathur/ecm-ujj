import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../bacxkendUrl/BackendUrl";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const OrdersItem = ({ orders }) => {
  const order = orders.orders;
  const [image, setImage] = useState("");
  const [imageId, setImageId] = useState("");
  const fetchPostInfo = async () => {
    try {
      const data = await axios.get(`${url}/post/get-post-by-id/${orders?.post?.[0]?.post}`);
      const res = data.data;
      if (res.success) {
        setImage(res.post.postImage);
        setImageId(res.post._id);
      } else {
        toast.error(res.message || "Failed to fetch post details");
      }
    } catch (error) {
      toast.error("Error fetching post details");
    }
  };
  

  useEffect(() => {
   fetchPostInfo();
   if (orders?.post?.[0]?.post) {
    fetchPostInfo();
  }
  }, []);

  const cancelOrders = async () => {
    try {
      const data = await axios.post(
        `${url}/post/cancel-order`,
        { orderId: orders?._id },
        {
          withCredentials: true,
          withXSRFToken: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      const res = data.data;

      if (res.success) {
        fetchPostInfo()
        toast.success("Order cancelled successfully!");
        
      } else {
        toast.error(res.message || "Failed to cancel order");
      }
    } catch (error) {
      toast.error("Error cancelling order");
    }
  };

  return (
    <div
      className="p-4 sm:p-6 relative"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='25' cy='25' r='2'/%3E%3Ccircle cx='125' cy='125' r='2'/%3E%3Ccircle cx='75' cy='75' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: "cover, 150px 150px",
      }}
    >
      <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 max-w-lg mx-auto relative z-10">
        {/* Subtle Glow Effect */}
        <div className="absolute inset-0 -z-10 bg-blue-500/10 blur-3xl rounded-xl scale-105 animate-pulse-slow"></div>

        {/* Orders Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-600/50 p-4">
          <p className="text-gray-300 text-sm sm:text-base font-medium drop-shadow-sm">
            <span className="font-semibold text-blue-400">Order ID:</span>{" "}
            {orders?._id.slice(16, 28)}
          </p>
          <p className="text-gray-300 text-sm sm:text-base font-medium mt-2 sm:mt-0 drop-shadow-sm">
            <span className="font-semibold text-blue-400">Status:</span>{" "}
            <span
              className={`${
                orders?.status === "cancelled"
                  ? "text-red-400"
                  : orders?.status === "delivered"
                  ? "text-green-400"
                  : "text-yellow-400"
              } capitalize`}
            >
              {orders?.status}
            </span>
          </p>
        </div>

        {/* Orders Details */}
        <div className="flex flex-col items-center gap-4 p-4">
          <p className="text-gray-300 text-sm sm:text-base font-medium drop-shadow-sm">
            <span className="font-semibold text-blue-400">Order Date:</span>{" "}
            {new Date(orders?.createdAt).toLocaleString()}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <Link to={`/post-item/${imageId}`}>
                <img
                  src={image || "https://via.placeholder.com/100"}
                  alt="Product"
                  className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-md shadow-md hover:scale-110 transition-transform duration-300"
                />
              </Link>
            </div>
            {/* Orders Info */}
            <div className="text-gray-300 text-sm sm:text-base space-y-2">
              <p>
                <span className="font-semibold text-blue-400">Price:</span>{" "}
                ₹{orders?.postPrice?.toFixed(2) || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-blue-400">User ID:</span>{" "}
                {orders?.user?.slice(16, 28)}
              </p>
              <p>
                <span className="font-semibold text-blue-400">Product ID:</span>{" "}
                {orders?.post[0]?.post.slice(16, 28)}
              </p>
              <p>
                <span className="font-semibold text-blue-400">Quantity:</span>{" "}
                {orders?.post[1]?.quantity || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Cancel Orders Button */}
        <div className="p-4">
          <button
            onClick={cancelOrders}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all duration-300 text-sm sm:text-base font-medium disabled:bg-red-400 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            disabled={orders?.status === "cancelled" || orders?.status === "delivered"}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersItem;