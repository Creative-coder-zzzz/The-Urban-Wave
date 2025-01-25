import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
}) {
  const [select, setSelect] = useState(true);

  function handleSelectButton(addressInfo) {
    setSelect(!select);
    if (select === false) {
      setCurrentSelectedAddress(null);
    } else {
      setCurrentSelectedAddress(addressInfo);
    }
  }

  return (
    <Card
      className={` ${
        select
          ? "hover:border-red-300 hover: border-2"
          : "border-4 border-black"
      }`}
    >
      <CardContent className="grid gap-4 p-2">
        <Label className="flex">
          <p className="font-semibold ">Address:</p>
          {addressInfo?.address}{" "}
        </Label>
        <Label className="flex">
          <p className="font-semibold ">City: </p> {addressInfo?.city}{" "}
        </Label>
        <Label className="flex">
          {" "}
          <p className="font-semibold ">Pincode: </p> {addressInfo?.pincode}{" "}
        </Label>
        <Label className="flex">
          {" "}
          <p className="font-semibold ">Phone: </p> {addressInfo?.phone}{" "}
        </Label>
        <Label className="flex">
          {" "}
          <p className="font-semibold ">Notes:</p>
          {addressInfo?.notes}{" "}
        </Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button
          variant="destructive"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
        <Button onClick={() => handleSelectButton(addressInfo)}>
          {select ? "select" : "Cancel"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
