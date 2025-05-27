import React from "react";
import { AlignJustify, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { LogoutUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";
function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  function handleLogOut() {
    dispatch(LogoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm "
          onClick={() => {
            handleLogOut();
          }}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
