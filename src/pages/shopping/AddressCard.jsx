import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import React from "react";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  currentSelectedAddress,
}) {
  const isSelected = currentSelectedAddress?._id === addressInfo?._id;

  return (
    <Card
      className={`cursor-pointer border-2 ${isSelected ? "border-black" : "border-transparent"}`}
      onClick={() => setCurrentSelectedAddress(addressInfo)}
    >
      <CardContent className="grid gap-2 p-2">
        <Label className="flex gap-1">
          <p className="font-semibold">Address:</p>
          {addressInfo?.address}
        </Label>
        <Label className="flex gap-1">
          <p className="font-semibold">City:</p> {addressInfo?.city}
        </Label>
        <Label className="flex gap-1">
          <p className="font-semibold">Pincode:</p> {addressInfo?.pincode}
        </Label>
        <Label className="flex gap-1">
          <p className="font-semibold">Phone:</p> {addressInfo?.phone}
        </Label>
        <Label className="flex gap-1">
          <p className="font-semibold">Notes:</p>
          {addressInfo?.notes}
        </Label>
      </CardContent>

      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => setCurrentSelectedAddress(addressInfo)}>
          {isSelected ? "Selected" : "Select"}
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
