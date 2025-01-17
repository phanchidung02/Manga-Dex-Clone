"use client";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { RootState } from "@/store/store";
import { IUserStore } from "@/store/user";
import { useSelector } from "react-redux";

export default function Home() {
  const { userInfo } = useSelector<RootState, IUserStore>((s) => s.user);
  const handleLogout = () => {
    localStorage.removeItem("information");
    window.location.href = "/auth/login";
  };

  return (
    <div>
      <Sidebar>
        <SidebarHeader>
          <div>huhu</div>
          <p>{userInfo?.data?.attributes?.username}</p>
        </SidebarHeader>
        <SidebarFooter>
          <div>haha</div>
          <Button onClick={handleLogout}>Log out</Button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
