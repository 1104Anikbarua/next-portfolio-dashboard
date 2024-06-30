import { ThemeProvider } from "@emotion/react";
import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { theme } from "../Theme/Theme";
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>;
    </ReduxProvider>
  );
};

export default Provider;
// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/1104Anikbarua/next-portfolio-dashboard.git
// git push -u origin main
