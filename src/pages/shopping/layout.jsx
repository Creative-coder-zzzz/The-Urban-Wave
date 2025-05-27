import React from "react";
import { Outlet } from "react-router-dom";
import Shoppingheader from "./header";

function Shoppinglayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <Shoppingheader />
      <main className="flex flex-com w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Shoppinglayout;
