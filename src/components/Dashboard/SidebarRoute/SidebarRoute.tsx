import { IMenuItems } from "@/types/global";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface IDrawerSidebarProps {
  index: number;
  item: IMenuItems;
}
const SidebarRoute = ({ item, index }: IDrawerSidebarProps) => {
  const href = `/dashboard/${item?.path}`;
  const pathname = usePathname();
  return (
    <Link
      key={index}
      href={href}
      style={{ textDecoration: "none", color: "#030712" }}
    >
      <ListItem
        disablePadding
        sx={{
          ...(pathname === href
            ? {
                borderRight: "3px solid #1e88e5",
                "& svg": { color: "#1e88e5" },
              }
            : {}),
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item?.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item?.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarRoute;
