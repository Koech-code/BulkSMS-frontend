import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const NavBar = () => {
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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "green" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button to="/" color="inherit" sx={{ marginRight: '16px' }}>
                            Home
                        </Button>

                        <Button to="/parents" color="inherit" sx={{ marginRight: '16px' }}>
                            Parents
                        </Button>

                        <Button to="/artworks" color="inherit" sx={{ marginRight: '16px' }}>
                            Artworks
                        </Button>
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
        </Box>
    );
};

export default NavBar;
