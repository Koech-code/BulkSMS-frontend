import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:443/api/artworks/artwork/${id}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setArtwork(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handlePay = () => {
        // TODO: implement payment functionality
        alert(`Payment successful for ${artwork.title}!`);
    };

    if (!artwork) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:443/${artwork.image_url}`}
                    alt={artwork.title}
                />
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
