import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaIdCard, FaUserCog, FaUsers } from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import { List } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";

import { AiOutlineFolder } from "react-icons/ai";
import {
  MdDataUsage,
  MdDoubleArrow,
  MdHome,
  MdNotificationsNone,
  MdOutlineAnalytics,
  MdOutlineAssignment,
  MdOutlineContactSupport,
  MdOutlineDriveFolderUpload,
  MdOutlineLibraryBooks,
  MdOutlineMail,
  MdOutlineNotifications,
  MdOutlineNotificationsActive,
  MdOutlineSettings,
  MdOutlineStairs,
  MdOutlineSupervisedUserCircle,
  MdWebStories,
} from "react-icons/md";

import { BusinessContext } from "../../services/businessContext";
import { ListItemForLayout } from "./ListItemForLayout.component";
import TopAppBarComponent from "./TopAppBarComponent";
import colors from "../../Themes/basic";
export const Layout = ({ children }) => {
  const {} = useContext(BusinessContext);
  const router = useRouter();

  const [drawerWidth, setDrawerWidth] = useState("20%");
  const [listIndex, setListIndex] = useState(null);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => {
    return {
      flexShrink: 0,
      boxSizing: "border-box",
      backgroundColor: colors.light,
      overflowX: "hidden",
      top: "50px",
      transition: "left 2s  cubic-bezier(0.4, 0, 0.6, 1)",

      "& .MuiDrawer-paper": {
        overflowX: "hidden",
        top: "50px",
        backgroundColor: colors.light,

        width: open ? drawerWidth : "auto",
        transition: "right 2s  cubic-bezier(0.4, 0, 0.6, 1)",
      },
    };
  });

  return (
    <div id="main">
      <TopAppBarComponent />

      <Drawer
        variant="permanent"
        open={open}
        style={{ backgroundColor: colors.primaryLightest }}
      >
        <List
          dense={true}
          sx={{
            bgcolor: colors.light,
            height: "100%",
            overflow: open ? "auto" : "hidden",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemForLayout
            tabName="Dashboard"
            icon={(color) => <MdHome color={color} size={40} />}
            active={router.pathname === "/"}
            onClick={() => router.push("/")}
          />
          <ListItemForLayout
            tabName="Dashboard"
            icon={(color) => <MdHome color={color} size={40} />}
            active={router.pathname === "/none"}
            onClick={() => router.push("/none")}
          />
          <ListItemForLayout
            tabName="Dashboard"
            icon={(color) => <MdHome color={color} size={40} />}
            active={router.pathname === "/none"}
            onClick={() => router.push("/")}
          />
          <ListItemForLayout
            tabName="Dashboard"
            icon={(color) => <MdHome color={color} size={40} />}
            active={router.pathname === "/none"}
            onClick={() => router.push("/")}
          />
        </List>
      </Drawer>

      <div
        style={{
          marginTop: 20,
          backgroundColor: colors.backColor,
          marginLeft: open ? drawerWidth : "4%",
        }}
        className="rightContainer"
      >
        {children}
      </div>
    </div>
  );
};
