import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavLink as Link, useRoutes } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Home from '../pages/home/home'
import CustomerLogin from "../pages/customers/Login";
import AdminLogin from "../pages/admin/AdminLogin";
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useTheme } from '@material-ui/core/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
// const drawerWidth = "160px"
// import { ArrowDropDown } from '@material-ui/icons';
import { ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';

const routes = [
    { path: '/', element: <AdminLogin /> },
    { path: '/customer', element: <CustomerLogin /> }
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
    const [walletAddress, setWalletAddress] = useState("1WA6yAdy7kZW4pxziJv6aYFyyiXU2zihEEMELG");
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:443/api/v1.1/wallet/balance',
                    { walletAddress },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem("token")} `,
                        }
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

    const routesOutlet = useRoutes(routes);

    const drawer = (

        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem component={Link} to="/home" button onClick={handleDrawerToggle}>
                    <ListItemIcon>
                        <HomeIcon sx={{ color: "#00A86B" }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                        <AdminPanelSettingsIcon sx={{ color: "#00A86B" }} />
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                </ListItem>
                <Menu
                    id="admin-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {/* <MenuItem onClick={handleClose} component={Link} to="/">Login</MenuItem> */}
                    <MenuItem onClick={handleClose} component={Link} to="/activation/requests">Requests</MenuItem>
                </Menu>
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
                            <ListItemText style={{ paddingLeft: "50px" }} primary="Customers List" />
                        </ListItem>
                        {/* <ListItem button>
                            <ListItemText primary="Option 2" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Option 3" />
                        </ListItem> */}
                    </List>
                </Collapse>

                <ListItem button onClick={toggleParentsDropdown}>
                    <ListItemIcon>
                        <PeopleIcon sx={{ color: "#00A86B" }} />
                    </ListItemIcon>
                    <ListItemText primary="Parents" />
                    {openParents ? <ArrowDropUp /> : <ArrowDropDown />}
                </ListItem>
                <Collapse in={openParents}>
                    <List>
                        <ListItem button component={Link} to="/parents">
                            <ListItemText style={{ paddingLeft: "50px" }} primary="Parents List" />
                        </ListItem>
                        {/* <ListItem button>
                            <ListItemText primary="Option 2" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Option 3" />
                        </ListItem> */}
                    </List>
                </Collapse>


            </List>
            {/* <Divider /> */}
            <Divider sx={{ bgcolor: 'gray' }} />
            <List>
                <ListItem button component={Link} to="/settings" >
                    <ListItemIcon>
                        <SettingsIcon sx={{ color: "#00A86B" }} />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button >
                    <ListItemIcon>
                        <LogoutIcon sx={{ color: "#00A86B" }} />
                    </ListItemIcon>
                    <ListItemText primary="Log Out" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ backgroundColor: "#00A86B", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />

                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button to="/home" color="inherit" sx={{ marginRight: '16px' }}>
                            Home
                        </Button>
                        {/*
                        <Button to="/parents" color="inherit" sx={{ marginRight: '16px' }}>
                            Parents
                        </Button>

                        <Button to="/artworks" color="inherit" sx={{ marginRight: '16px' }}>
                            Artworks
                        </Button> */}
                    </Box>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Artworks
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccountBalanceWalletIcon sx={{ marginLeft: '8px' }} />
                        <Typography>
                            Bk {balance ? balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Loading...'}
                        </Typography>


                    </Box>
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            // width:
                            // { drawerWidth },
                            backgroundColor: 'white',
                            color: "black"
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            // width: { drawerWidth },
                            backgroundColor: 'black',
                            color: "white"
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