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
    // {
    //   title: "Dashboard",
    //   path: ``,
    //   icon: DashboardIcon,
    // },
    // {
    //   title: "Manage Blog",
    //   path: `blog/manage-blog`,
    //   icon: SystemUpdateAltIcon,
    // },
    // {
    //   title: "Delete Blog",
    //   path: `blog/delete-blog`,
    //   icon: DeleteSweepIcon,
    // },
    {
      title: "Blog",
      path: `blog`,
      icon: DashboardIcon,
    },
    {
      title: "Add Blog",
      path: `blog/add-blog`,
      icon: AddCircleOutlineIcon,
    },
    {
      title: "Education",
      path: `education`,
      icon: DashboardIcon,
    },
    {
      title: "Add Education",
      path: `education/add-education`,
      icon: AddCircleOutlineIcon,
    },
    // {
    //   title: "Manage Education",
    //   path: `education/manage-education`,
    //   icon: SystemUpdateAltIcon,
    // },
    // {
    //   title: "Delete Education",
    //   path: `education/delete-education`,
    //   icon: DeleteSweepIcon,
    // },
    {
      title: "Skill",
      path: `skill`,
      icon: DashboardIcon,
    },
    {
      title: "Add Skill",
      path: `skill/add-skill`,
      icon: AddCircleOutlineIcon,
    },
    // {
    //   title: "Manage Skill",
    //   path: `skill/manage-skill`,
    //   icon: SystemUpdateAltIcon,
    // },
    // {
    //   title: "Delete Skill",
    //   path: `skill/delete-skill`,
    //   icon: DeleteSweepIcon,
    // },
    {
      title: "Project",
      path: `project`,
      icon: DashboardIcon,
    },
    {
      title: "Add Project",
      path: `project/add-project`,
      icon: AddCircleOutlineIcon,
    },
    // {
    //   title: "Manage Project",
    //   path: `project/manage-project`,
    //   icon: SystemUpdateAltIcon,
    // },
    // {
    //   title: "Delete Project",
    //   path: `project/delete-project`,
    //   icon: DeleteSweepIcon,
    // },
    {
      title: "Experience",
      path: `experience`,
      icon: DashboardIcon,
    },
    {
      title: "Add Experience",
      path: `experience/add-experience`,
      icon: AddCircleOutlineIcon,
    },
    // {
    //   title: "Manage Experience",
    //   path: `experience/manage-experience`,
    //   icon: SystemUpdateAltIcon,
    // },
    // {
    //   title: "Delete Experience",
    //   path: `experience/delete-experience`,
    //   icon: DeleteSweepIcon,
    // },
  ];
  return menuItems;
};
