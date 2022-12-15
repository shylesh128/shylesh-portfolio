import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import colors from "../../Themes/basic";
import { Badge } from "@mui/material";
import {
  MdArrowBack,
  MdArrowDropDown,
  MdArrowDropUp,
  MdLogout,
  MdNotifications,
  MdSettings,
} from "react-icons/md";

import * as React from "react";
import { BusinessContext } from "../../services/businessContext";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { ListItemForLayout } from "./ListItemForLayout.component";

const ResponsiveAppBar = () => {
  const { user, logout } = React.useContext(BusinessContext);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 0, boxShadow: "0px 0px 9px 0px rgba(0,0,0,1)" }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: colors.bgColorActive,
            color: colors.mainLight,
            flexGrow: 1,
            height: "4rem",
            padding: 0,
            margin: 0,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100000,
          }}
        >
          <Container maxWidth="none">
            <Toolbar
              disableGutters
              sx={{
                width: "100%",
              }}
            >
              {/* <LogoSVG
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                }}
              /> */}

              <Box
                sx={{
                  flexGrow: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <Badge
                    variant="dot"
                    sx={{
                      "& .MuiBadge-badge": {
                        color: "lightgreen",
                        backgroundColor: "red",
                      },
                    }}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MdNotifications color="white" />
                  </Badge>
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <div
        style={{
          marginLeft: "80px",
          marginTop: 75,
          position: "absolute",
        }}
      >
        <IconButton
          onClick={() => {
            router.back();
          }}
        >
          <MdArrowBack color="black" />
        </IconButton>
      </div>
    </div>
  );
};
export default ResponsiveAppBar;
