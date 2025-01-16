"use client";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { updateAuthenticated } from "@/store/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const [isLogout, setIsLogout] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("information");
    dispatch(updateAuthenticated(false));
    setIsLogout(true);
  };

  useEffect(() => {
    if (isLogout) {
      window.location.href = '/auth/login';
    }
  }, [isLogout]);
  return (
    <div>
      <Sidebar>
        <SidebarHeader>
          <div>huhu</div>
        </SidebarHeader>
        <SidebarFooter>
          <div>haha</div>
          <Button onClick={handleLogout}>Log out</Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
