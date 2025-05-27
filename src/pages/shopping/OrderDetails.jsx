import CommonForm from "@/components/common/form";
import { DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

const initialFormData = {
  status: "",
};

function ShoppingOrderDetails() {
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(event) {
    event.preventDefault();
  }
  return (
    <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-scroll overflow-x-hidden">
      <div className="grid gap-6">
        <Label className="font-bold text-xl">Order Details</Label>
        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Order Id</p>
          <Label>1234</Label>
        </div>

        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Order Date</p>
          <Label>02/01/2024</Label>
        </div>

        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Order Status</p>
          <Label>In process</Label>
        </div>

        <div className=" mt-2 flex items-center justify-between">
          <p className="font-medium"> Order Price</p>
          <Label>$4000</Label>
        </div>

        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Details-:</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product one</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="gap-2">
            <div className="font-medium">Shipping Information</div>

            <div className="grid gap-0.5" text-muted-foreground>
              <span>Sandesh Adhikari</span>
              <span> Address</span>
              <span> City</span>
              <span> Pincode</span>
              <span> Phone</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetails;
