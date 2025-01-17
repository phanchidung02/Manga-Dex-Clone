"use client";
import { useCheckAuthQuery } from "@/services/api/auth/auth";
import { useLazyGetMeQuery } from "@/services/api/users/user";
import { IAuthStore } from "@/store/auth";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

interface ICheckAuthProviderProps {
  children: React.ReactNode;
}
function CheckAuthProvider({ children }: ICheckAuthProviderProps) {
  const { isAuthenciated } = useSelector<RootState, IAuthStore>((s) => s.auth);
  const { isLoading } = useCheckAuthQuery();
  const [getMe] = useLazyGetMeQuery();
  const pathname = usePathname();

  useEffect(() => {
    const isLoginPage = pathname.includes("/auth/login");
    if (isLoginPage) return;
    if (!isAuthenciated && !isLoading) {
      window.location.href = "/auth/login";
      return;
    }
    getMe();
  }, []);

  return <div>{children}</div>;
}

export default CheckAuthProvider;
