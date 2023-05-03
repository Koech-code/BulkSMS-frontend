import { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Divider,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    const drawerContent = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem >
                    <ListItemText primary="Item 1" />
                </ListItem>
                <ListItem >
                    <ListItemText primary="Item 2" />
                </ListItem>
                <ListItem >
                    <ListItemText primary="Item 3" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    {isSmallScreen && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6">My App</Typography>
                </Toolbar>
            </AppBar>
            <Drawer open={isSmallScreen && isDrawerOpen} onClose={handleDrawerClose}>
                {drawerContent}
            </Drawer>
        </div>
    );
}

export default Navbar;
