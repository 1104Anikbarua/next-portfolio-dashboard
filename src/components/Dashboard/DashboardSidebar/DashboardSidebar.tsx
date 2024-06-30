import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { Box, Stack, Typography } from "@mui/material";
// import { IUserRole } from "@/types/global";
// import Image from "next/image";
import Link from "next/link";
// import logo from "@/assets/logo/v (2).png";
import { generateMenutItems } from "@/utlis/getMenuItems";
import SidebarRoute from "../SidebarRoute/SidebarRoute";
// import { GetRole } from "@/utlis/getUserRole";

const DashboardSidebar = () => {
  // get user role
  //   const role = GetRole();

  //   const items = generateMenutItems(role as IUserRole);
  const items = generateMenutItems();
  return (
    <Box>
      {/* dashboard logo and name start here */}
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        py={1}
        component={Link}
        href={"/dashboard"}
        sx={{ textDecoration: "none" }}
      >
        {/* <Image src={logo} width={50} height={50} alt="amigo site logo" /> */}
        <Typography ml={1}>Home</Typography>
      </Stack>
      {/* dashboard logo and name ends here */}
      {/* dashboard sidebar menu options start here  */}
      <Divider />
      <List>
        {items?.map((item, index) => (
          <SidebarRoute item={item} key={index} index={index} />
        ))}
      </List>
      {/* dashboard sidebar menu options ends here  */}
    </Box>
  );
};

export default DashboardSidebar;
