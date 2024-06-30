"use client";
import { ThemeProvider } from "@emotion/react";
import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { theme } from "../Theme/Theme";
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ReduxProvider>
  );
};

export default Provider;
