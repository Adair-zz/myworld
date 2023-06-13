import { ReactElement, useState, MouseEvent } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { Theme, useTheme, styled, CSSObject } from "@mui/material/styles";
import {
  ChevronLeftOutlined,
  MenuOutlined,
  HomeOutlined,
  CandlestickChartOutlined,
  NewspaperOutlined,
  AccountBalanceOutlined,
  VoicemailOutlined,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import "react-pro-sidebar/dist";

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event: MouseEvent, index: number) => {
    setSelectedIndex(index);
  };

  const openedMixin = (theme: Theme): CSSObject => ({
    width: 200,
    backgroundColor: colors.primary[400],
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    backgroundColor: colors.primary[400],
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    margin: "0 5px 0 0",
    gap: "10px",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const StyledLink = styled(Link)({
    textDecoration: "none",
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: 200,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const Item = ({
    text,
    to,
    index,
    icon,
  }: {
    text: string;
    to: string;
    index: number;
    icon: ReactElement;
  }) => {
    return (
      <StyledLink to={to}>
        <ListItem
          key={text}
          disablePadding
          sx={{
            display: "block",
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              // backgroundColor:
              //   selectedIndex === index ? colors.primary[900] : "inherit",
            }}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{
                opacity: open ? 1 : 0,
                color: `${colors.grey[100]}`,
              }}
            />
          </ListItemButton>
        </ListItem>
      </StyledLink>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: `${colors.primary[400]}`,
      }}
    >
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            variant={"h4"}
            color={colors.grey[100]}
            sx={{ opacity: open ? 1 : 0 }}
          >
            Zheng Zhang
          </Typography>
          <IconButton onClick={handleDrawer}>
            {open ? <ChevronLeftOutlined /> : <MenuOutlined />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Item text={"Dashboard"} to={"/"} index={0} icon={<HomeOutlined />} />
          <Item
            text={"Stock"}
            to={"/stock"}
            index={1}
            icon={<CandlestickChartOutlined />}
          />
          <Item
            text={"Stock News"}
            to={"/stock-news"}
            index={2}
            icon={<NewspaperOutlined />}
          />
          <Item
            text={"Balance"}
            to={"/balance"}
            index={3}
            icon={<AccountBalanceOutlined />}
          />
          <Item
            text={"Demo Trading"}
            to={"/demo-trading"}
            index={4}
            icon={<VoicemailOutlined />}
          />
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBar;
