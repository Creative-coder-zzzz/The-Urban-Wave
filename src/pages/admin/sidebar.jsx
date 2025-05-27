import React, { Fragment } from "react";
import { ChartNoAxesCombined, Gauge, Package, Logs } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <Gauge />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Package />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <Logs />,
  },
];
function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((MenuItems) => (
        <div
          key={MenuItems.id}
          onClick={() => {
            navigate(MenuItems.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex text-xl items-center gap-2 rounded-md px-3 py-2 cursor-pointer
          text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {MenuItems.icon}
          <p> {MenuItems.label} </p>
        </div>
      ))}
    </nav>
  );
}

function Adminsidebar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <ChartNoAxesCombined size={30} />
                Admin Panel
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex cursor-pointer items-center gap-2 "
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default Adminsidebar;
