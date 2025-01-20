"use client";
import { useAppLoading } from "@/hooks/use-loading";
import { useCheckAuthQuery } from "@/services/api/auth/auth";
import { useLazyGetMeQuery } from "@/services/api/users/user";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface ICheckAuthProviderProps {
  children: React.ReactNode;
}
function CheckAuthProvider({ children }: ICheckAuthProviderProps) {
  const { isLoading, isError } = useCheckAuthQuery();
  const [getMe, { isLoading: isLoadingUser }] = useLazyGetMeQuery();
  const pathname = usePathname();

  useAppLoading([isLoading, isLoadingUser]);

  useEffect(() => {
    const isLoginPage = pathname.includes("/auth/login");
    if (isLoginPage) return;
    if (isError) {
      window.location.href = "/auth/login";
      return;
    }
    getMe();
  }, [isError]);

  return <div>{children}</div>;
}

export default CheckAuthProvider;
