import CommonForm from "@/components/common/form";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const initialFormData = {
  status: "",
};

function ShoppingOrderDetails({ order }) {
  if (!order) return null;

  const [formData, setFormData] = useState(initialFormData);
  const { orders } = useSelector((state) => state.shopOrder);

  const orderDate = new Date(order.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  function handleUpdateStatus(event) {
    event.preventDefault();
  }
  return (
    <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-scroll overflow-x-hidden">
      <div className="grid gap-6">
        <Label className="font-bold text-xl">Order Details</Label>
        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Order Id</p>
          <Label>{order?._id}</Label>
        </div>

        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Order Date</p>
          <Label>{orderDate}</Label>
        </div>

        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Payment method</p>
          <Label>{order?.paymentMethod}</Label>
        </div>

        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Payment Id</p>
          <Label>{order?.paymentId}</Label>
        </div>

        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Payment Status</p>
          <Label>{order?.paymentStatus}</Label>
        </div>

        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Order Status</p>
          <Label>{order?.orderStatus}</Label>
        </div>

        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Order Price</p>
          <Label>₹{order?.totalAmount}</Label>
        </div>

        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Details-:</div>
            {order.cartItems.map((items, index) => {
              return (
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span>{items.title}</span>
                    <span>₹{items.price}</span>
                  </li>
                </ul>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="gap-2">
            <div className="font-medium">Shipping Information</div>

            <div className="grid gap-0.5" text-muted-foreground>
              <span>{order?.addressInfo?.address}</span>
              <span> {order?.addressInfo?.city}</span>
              <span> {order?.addressInfo?.notes}</span>
              <span> {order?.addressInfo?.phone}</span>
              <span> {order?.addressInfo?.pincode}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetails;
