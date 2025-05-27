import { recentOrders } from "@/store/shop/order-slice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function RecentOrders() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dispatch(recentOrders()).then((action) => {
      if (action?.payload?.success) {
        setOrders(action?.payload?.data);
      }
    });
  }, [dispatch]);

  const getStatusIndex = (status) => {
    const statuses = ["Order Placed", "Shipped", "Delivered"];
    return statuses.indexOf(status);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <div className="flex flex-col gap-4">
          {orders && orders.length > 0
            ? orders.map((cartItem, index) => {
                const data = cartItem?.cartItems[index];
                const statusIndex = getStatusIndex(cartItem?.orderStatus);

                return (
                  <div className="flex gap-3 p-4 items-center" key={index}>
                    {/* Product Image */}
                    <div className="w-60 h-60 overflow-hidden">
                      <img
                        src={data.image}
                        alt="Product"
                        className="object-cover object-center w-full h-full"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="w-full h-full border-2 p-4">
                      <div>
                        <p className="font-semibold">Product Details</p>
                        <p>{data.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {data.quantity}
                        </p>
                      </div>

                      {/* Order Status */}
                      <div className="mt-4">
                        <p className="font-semibold">Order Status</p>
                        <div className="flex items-center justify-between mt-2">
                          {["Order Placed", "Shipped", "Delivered"].map(
                            (status, idx) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <div
                                  className={`w-6 h-6 rounded-full ${
                                    idx <= statusIndex
                                      ? "bg-green-500"
                                      : "bg-gray-300"
                                  }`}
                                ></div>
                                {idx < 2 && (
                                  <div
                                    className={`w-12 h-1 ${
                                      idx < statusIndex
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                    }`}
                                  ></div>
                                )}
                              </div>
                            )
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Current Status: {cartItem.orderStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default RecentOrders;
