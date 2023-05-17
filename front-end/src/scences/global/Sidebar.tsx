import { ReactElement } from "react";
import { Link } from "react-router-dom";
import {
  MenuItemStyles,
  useProSidebar,
  Sidebar,
  Menu,
  MenuItem,
  // menuClasses,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import {
  MenuOutlined,
  HomeOutlined,
  CandlestickChartOutlined,
  NewspaperOutlined,
  AccountBalanceOutlined,
  VoicemailOutlined,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import "react-pro-sidebar/dist";

interface ItemProps {
  title: string;
  to: string;
  icon: ReactElement;
}

const Item = ({ title, to, icon }: ItemProps) => {
  return (
    <MenuItem
      icon={icon}
      component={<Link to={to} />}
      // rootStyles={{
      //   ["." + menuClasses.button]: {
      //     "&:hover": {
      //       color: "#868dfb",
      //     },
      //   },
      // }}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collapseSidebar, collapsed } = useProSidebar();

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 500,
      color: colors.grey[100],
    },
    icon: {
      backgroundColor: "transparent",
    },
    button: {
      "&:hover": {
        backgroundColor: "inherit",
        color: "#868dfb",
      },
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
      }}
    >
      <Sidebar backgroundColor={colors.primary[400]} width={"200px"}>
        <Menu menuItemStyles={menuItemStyles}>
          <MenuItem
            icon={
              collapsed ? (
                <MenuOutlined onClick={() => collapseSidebar()} />
              ) : undefined
            }
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!collapsed && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // ml: 15,
                }}
              >
                <Typography variant={"h4"} color={colors.grey[100]}>
                  Zheng Zhang
                </Typography>
                <IconButton onClick={() => collapseSidebar()}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Item title="Dashboard" to="/" icon={<HomeOutlined />} />
          <Item title="Stock" to="/stock" icon={<CandlestickChartOutlined />} />
          <Item
            title="Stock News"
            to="/stock-news"
            icon={<NewspaperOutlined />}
          />
          <Item
            title="Balance"
            to="/balance"
            icon={<AccountBalanceOutlined />}
          />
          {!collapsed && (
            <Typography
              variant={"h6"}
              color={colors.grey[100]}
              sx={{ m: "10px 0 0 20px" }}
            >
              Trading
            </Typography>
          )}
          <Item
            title="Demo Trading"
            to="/demo-trading"
            icon={<VoicemailOutlined />}
          />
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
