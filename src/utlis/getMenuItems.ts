// import { USER_ROLE } from "@/constant/constant";
import {
  IMenuItems,
  // IUserRole
} from "@/types/global";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import BorderAllIcon from "@mui/icons-material/BorderAll";
//
export const generateMenutItems = () => {
  // store menuitems based on role
  const menuItems: IMenuItems[] = [
    {
      title: "Dashboard",
      path: ``,
      icon: DashboardIcon,
    },
    {
      title: "Add Blog",
      path: `blog/add-blog`,
      icon: AddCircleOutlineIcon,
    },
    {
      title: "Manage Blog",
      path: `blog/update-blog`,
      icon: SystemUpdateAltIcon,
    },
    {
      title: "Delete Blog",
      path: `blog/remove-blog`,
      icon: DeleteSweepIcon,
    },
    {
      title: "Add Education",
      path: `education/add-education`,
      icon: AddCircleOutlineIcon,
    },
    {
      title: "Manage Education",
      path: `education/update-education`,
      icon: SystemUpdateAltIcon,
    },
    {
      title: "Delete Education",
      path: `education/remove-education`,
      icon: DeleteSweepIcon,
    },
    {
      title: "Add Skill",
      path: `skill/add-skill`,
      icon: AddCircleOutlineIcon,
    },
    {
      title: "Manage Skill",
      path: `skill/update-skill`,
      icon: SystemUpdateAltIcon,
    },
    {
      title: "Delete Skill",
      path: `skill/remove-skill`,
      icon: DeleteSweepIcon,
    },
    {
      title: "Add Project",
      path: `project/add-project`,
      icon: AddCircleOutlineIcon,
    },
    {
      title: "Manage Project",
      path: `project/update-project`,
      icon: SystemUpdateAltIcon,
    },
    {
      title: "Delete Project",
      path: `project/remove-project`,
      icon: DeleteSweepIcon,
    },
    {
      title: "Add Experience",
      path: `experience/add-experience`,
      icon: AddCircleOutlineIcon,
    },
    {
      title: "Manage Experience",
      path: `experience/update-experience`,
      icon: SystemUpdateAltIcon,
    },
    {
      title: "Delete Experience",
      path: `experience/remove-experience`,
      icon: DeleteSweepIcon,
    },
  ];
  return menuItems;
};
