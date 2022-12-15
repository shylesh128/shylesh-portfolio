import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import colors from "../../Themes/basic";

export const ListItemForLayout = ({
  tabName,
  active,
  icon,
  onClick,
  collapse,
  list,
  subList,
  // clickEvent,
}) => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Tooltip
        title={tabName}
        placement="right-start"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "rgb(0,0,0,0.79)",
              "& .MuiTooltip-arrow": {
                color: "rgb(0,0,0,0.79)",
              },
            },
          },
        }}
      >
        <ListItemButton
          onClick={collapse ? handleClick : onClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            margin: 1.5,
            borderRadius: "12px",
            bgcolor: active ? colors.primaryDark : "white",
            color: active ? "white" : colors.primaryDark,
            height: 100,
            display: "grid",
            ":hover": {
              bgcolor: colors.primaryDark,
              color: "white",
              iconcolor: "white",
              webkitBoxShadow: "10px 10px 30px 0px rgba(57,7,120,1)",
              mozBoxshadow: "10px 10px 30px 0px rgba(57,7,120,1)",
              boxShadow: "10px 10px 30px 0px rgba(57,7,120,1)",
              // -moz-box-shadow: 10px 10px 30px 0px rgba(255,66,255,1),
              // box-shadow: 10px 10px 30px 0px rgba(255,66,255,1),
            },
          }}
        >
          <ListItemIcon
            style={{
              width: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon(active ? "white" : hover ? "white" : colors.primaryDark)}
          </ListItemIcon>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 600,
              margin: 0,
              textAlign: "center",
              color: hover || active ? "white" : colors.primaryDark,
            }}
          >
            {tabName}
          </p>
        </ListItemButton>
      </Tooltip>
      {collapse && (
        <Collapse
          in={open}
          // style={
          //   !sidePanelOpen && {
          //     position: "fixed",
          //     left: "50px",
          //     marginTop: -40,
          //     zIndex: 10000,
          //   }
          // }
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding dense={true}>
            {list.map((listItem, i) => (
              <ListItemForLayout
                subList={true}
                key={i}
                tabName={listItem.tabName}
                icon={listItem.icon}
                active={listItem.active}
                onClick={listItem.onClick}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};
