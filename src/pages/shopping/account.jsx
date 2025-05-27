import React from "react";
import accountImage from "../../assets/images/account.jpg";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import Orders from "./Orders";
import Address from "./Address";
import ShoppingOrders from "./Orders";
function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-[100vw] overflow-hidden">
        <img
          src={accountImage}
          alt="account image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border ng-background p-6 shadow-sm">
          <Tabs className="border-none">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
