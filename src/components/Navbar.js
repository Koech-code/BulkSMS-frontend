import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "green" }}>
                <Toolbar sx={{ justifyContent: "center" }}>
                    <Typography variant="h6" component="div">
                        Artworks
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button to="/" color="inherit">
                        Home
                    </Button>
                    <Button to="/parents" color="inherit">
                        Parents
                    </Button>
                    <Button to="/artworks" color="inherit">
                        Artworks
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
