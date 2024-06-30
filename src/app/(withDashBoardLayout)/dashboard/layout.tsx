import DashboardLayout from "@/components/Dashboard/DashboardLayout/DashboardLayout";
import React from "react";

const DashboardLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutPage;
