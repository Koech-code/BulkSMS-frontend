import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, TextField } from '@mui/material';
import jwtDecode from 'jwt-decode';

const Checkout = () => {
    const [userWalletAddress, setUserWalletAddress] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState(null);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Retrieve user ID from JWT token in local storage

        fetch(`http://localhost:443/api/artworks/artwork/${id}`, {
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

        fetch(`http://localhost:443/api/v1.1/wallet/pay/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include any required headers, such as authorization headers with the token
            },
            body: JSON.stringify(paymentData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the payment response as needed
                console.log(data);
                alert(`Payment successful for ${artwork.title}!`);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleGetAddress = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            // Use the userId variable as needed
            console.log('User ID:', userId);


            fetch(`http://localhost:443/api/v1.1/wallet/address/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setUserWalletAddress(data.walletAddress); // Store the user's wallet address in the state variable
                    setFrom(data.walletAddress); // Pre-fill the "from" address field with the user's wallet address
                })
                .catch((err) => {
                    console.log(err.message);
                });
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
                <CardMedia component="img" height="200" image={`http://localhost:443/${artwork.image_url}`} alt={artwork.title} />
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
        </Box>
    );
};

export default Checkout;
