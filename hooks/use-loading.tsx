import { LoadingContext } from "@/app/LoadingProvider";
import { useContext, useEffect } from "react";

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const useAppLoading = (deps: boolean[] = []) => {
  const { openLoading, closeLoading } = useContext(LoadingContext);

  useEffect(() => {
    let checker = deps.includes(true);
    if (checker) {
      openLoading();
    } else {
      closeLoading();
    }

    return () => {
      closeLoading();
    };
  }, deps);
};
