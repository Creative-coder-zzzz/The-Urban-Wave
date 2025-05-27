import { React, useState } from "react";
import { Outlet } from "react-router-dom";
import Adminsidebar from "./sidebar";
import AdminHeader from "./header";

function Adminlayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div>
      <div className="flex min-h-screen w-full">
        {/* admin sidebar */}
        <Adminsidebar open={openSidebar} setOpen={setOpenSidebar} />
        <div className="flex flex-1 flex-col">
          {/* admin header */}
          <AdminHeader setOpen={setOpenSidebar} />
          <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Adminlayout;
