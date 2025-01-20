"use client"
import React, { createContext } from "react";
import AppLoading from "./components/common/AppLoading/AppLoading";

type LoadingData = {
  openLoading: Function;
  closeLoading: Function;
};

export const LoadingContext = createContext<LoadingData>({
  openLoading: () => {},
  closeLoading: () => {},
});

type LoadingProviderProps = {
  children: React.ReactNode;
};

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const openLoading = () => {
    setIsLoading(true);
  };

  const closeLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ openLoading, closeLoading }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <AppLoading isLoading={isLoading} />
        {children}
      </div>
    </LoadingContext.Provider>
  );
};
