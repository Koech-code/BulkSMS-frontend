import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, TextField } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Checkout = () => {
    const [userWalletAddress, setUserWalletAddress] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        fetch(`https://3.83.201.151:7000/api/artworks/artwork/${id}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setArtwork(data);
                setTo(data.walletAddress);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handlePay = () => {
        const paymentData = {
            from,
            to,
            amount: artwork.price,
        };
        fetch(`https://3.83.201.151:7000/api/v1.1/wallet/pay/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include any required headers, such as authorization headers with the token
            },
            body: JSON.stringify(paymentData),
        })
            .then((response) => response.json())
            .then((data) => {

                // Log the data to the console for debugging purposes
                console.log(data);

                if (data.status === 'success') {
                    // Display success toast message
                    toast.success(`Payment successful for "${artwork.title}"`, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                } else {
                    // Display error toast message with the specific error message
                    toast.info(data.message, {
                        position: 'top-left',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }
            })
            .catch((err) => {
                // Log the error to the console for debugging purposes
                console.error(err);

                // Display error toast message
                toast.error('An error occurred. Please try again later.', {
                    position: 'top-left',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
            });
    }

    const handleGetAddress = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.id;
                // Use the userId variable as needed
                console.log('User ID:', userId);

                const response = await fetch(`https://3.83.201.151:7000/api/accounts/account/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUserWalletAddress(data.walletAddress); // Store the user's wallet address in the state variable
                    setFrom(data.walletAddress); // Pre-fill the "from" address field with the user's wallet address
                } else {
                    console.log('Failed to get account details:', response.status);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    if (!artwork) {
        return <div>Loading...</div>;
    }

    // Add the following line below the above code block
    console.log('Price data type:', typeof artwork.price);
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ maxWidth: 600 }}>
                <CardMedia component="img" height="200" image={`https://3.83.201.151:7000/${artwork.image_url}`} alt={artwork.title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {artwork.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {artwork.description}
                    </Typography>
                    <Typography variant="body2" color="secondary" sx={{ fontWeight: 'bold' }}>
                        Price: <Box component="span" sx={{ fontWeight: 'semibold' }}>BK{artwork.price}</Box>
                    </Typography>

                    <TextField
                        label="Send from"
                        fullWidth
                        margin="normal"
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleGetAddress}>Get Address</Button>
                    <TextField
                        type="text"
                        placeholder="To"
                        value={to}
                        label="Send To"
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        type="text"
                        value={artwork.price}
                        label="Amount in BK"
                        fullWidth
                        margin="normal"
                    />
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button size="small" onClick={handleBack}>Back</Button>
                    <Button size="small" onClick={handlePay}>Pay</Button>
                </CardActions>
            </Card>
            <ToastContainer
                // theme="dark"
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Box>
    );
};

export default Checkout;
