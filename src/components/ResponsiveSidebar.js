import * as React from "react";
import { useState, useEffect } from "react";
import { NavLink as Link, useRoutes } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import MenuIcon from "@mui/icons-material/Menu";

import IconButton from "@mui/material/IconButton";

import CustomerLogin from "../pages/customers/Login";
import AdminLogin from "../pages/admin/AdminLogin";

import PeopleIcon from "@mui/icons-material/People";

import axios from "axios";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useTheme } from "@material-ui/core/styles";

import LogoutIcon from "@mui/icons-material/Logout";
// const drawerWidth = "160px"
// import { ArrowDropDown } from '@material-ui/icons';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";

const routes = [
  { path: "/", element: <AdminLogin /> },
  { path: "/customer", element: <CustomerLogin /> },
];

export default function PermanentDrawerLeft() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openParents, setOpenParents] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleParentsDropdown = () => {
    setOpenParents(!openParents);
  };
  const [customers, setCustomers] = useState(null);

  const handleOpenDropdown = (event) => {
    setCustomers(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setCustomers(null);
  };

  const theme = useTheme();
  const [walletAddress, setWalletAddress] = useState(
    "1WA6yAdy7kZW4pxziJv6aYFyyiXU2zihEEMELG"
  );
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.post(
          "https://3.83.201.151:7000/api/v1.1/wallet/balance",
          { walletAddress },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")} `,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBalance();
  }, [walletAddress]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Redirect to the login page
    window.location.href = "/";
  };

  const routesOutlet = useRoutes(routes);

  const drawer = (
    <div>
      <Toolbar />
      <Divider sx={{ bgcolor: "gray" }} />
      <List>
        <ListItem button onClick={toggleDropdown}>
          <ListItemIcon>
            <PeopleIcon sx={{ color: "#00A86B" }} />
          </ListItemIcon>
          <ListItemText primary="Customers" />
          {dropdownOpen ? <ArrowDropUp /> : <ArrowDropDown />}
        </ListItem>
        <Collapse in={dropdownOpen}>
          <List>
            <ListItem button component={Link} to="/customers">
              <ListItemText
                style={{ paddingLeft: "50px" }}
                primary="Customers List"
              />
            </ListItem>
            <ListItem button component={Link} to="/send/bulkSMS">
              <ListItemText
                style={{ paddingLeft: "50px" }}
                primary="Send BulkSMS"
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
      {/* <Divider /> */}
      <Divider sx={{ bgcolor: "gray" }} />
      <List>
        <ListItem button onclick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon sx={{ color: "#00A86B" }} />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#00A86B",
          alpha: 0.8,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* 
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              to="/artworks"
              color="inherit"
              sx={{ marginRight: "16px", display: { xs: "none", md: "block" } }}
            >
              SymoGasPoint
            </Button>
          </Box> */}

          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography variant="h6" component="div">
              SymoGasPoint
            </Typography>
          </Box>
          {/* 
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccountBalanceWalletIcon
              sx={{ marginLeft: "8px", display: { xs: "none", md: "block" } }}
            />
            <Typography sx={{ display: { xs: "none", md: "block" } }}>
              Bk{" "}
              {balance
                ? balance.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "Loading..."}
            </Typography>
          </Box> */}
        </Toolbar>
      </AppBar>

      <nav aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              // width:
              // { drawerWidth },
              backgroundColor: "white",
              color: "black",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              // width: { drawerWidth },
              backgroundColor: "black",
              color: "white",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {routesOutlet}
      </Box>
    </Box>
  );
}
