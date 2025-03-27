import React from "react";
import { dateFormat } from "../../DateFormat/DateFormat";

const Orders = ({ order }) => {
  const orderDetails = order?.result;

  return (
    <div className="border border-gray-700 bg-gray-800 text-white rounded-xl px-3 py-3 shadow-lg transition-transform duration-300 p-">
      {/* Order ID */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-400 w-1/3">Order ID:</span>
        <span className="w-2/3">{orderDetails?._id}</span>
      </div>

      {/* Product ID */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-400 w-1/3">Product ID:</span>
        <span className="w-2/3">{orderDetails?.post[0]?._id}</span>
      </div>

      {/* User */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-400 w-1/3">User:</span>
        <span className="w-2/3">{orderDetails?.user}</span>
      </div>

      {/* Product Price */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-400 w-1/3">Product Price:</span>
        <span className="w-2/3">₹{orderDetails?.postPrice}</span>
      </div>

      {/* Quantity */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-400 w-1/3">Quantity:</span>
        <span className="w-2/3">{orderDetails?.post[1]?.quantity || "N/A"}</span>
      </div>

      {/* Status */}
      <div className="flex text-sm font-medium mb-2">
        <span className="text-gray-400 w-1/3">Status:</span>
        <span className={`w-2/3 font-bold ${orderDetails?.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>
          {orderDetails?.status}
        </span>
      </div>

      {/* Date */}
      <div className="flex text-sm font-medium">
        <span className="text-gray-400 w-1/3">Date:</span>
        <span className="w-2/3">{dateFormat(orderDetails?.createdAt)}</span>
      </div>
    </div>
  );
};

export default Orders;
