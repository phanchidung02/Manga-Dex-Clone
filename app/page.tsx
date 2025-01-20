"use client";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { RootState } from "@/store/store";
import { IUserStore } from "@/store/user";
import { useSelector } from "react-redux";
import _ from "lodash";

export default function Home() {
  const { userInfo } = useSelector<RootState, IUserStore>((s) => s.user);
  const handleLogout = () => {
    localStorage.removeItem("information");
    window.location.href = "/auth/login";
  };

  if (_.isEmpty(userInfo)) return <></>;

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
