import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

const ArtworkView = () => {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://3.83.201.151:7000/api/artworks/artwork/${id}`, {
            method: "GET",
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

    const handleCheckout = () => {
        setSelectedArtwork(artwork);
        navigate(`/pay/${artwork.id}`);
    }

    if (!artwork) {
        return <div>Loading...</div>;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ maxWidth: 600 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={`https://3.83.201.151:7000/${artwork.image_url}`}
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
                    <Button size="small" onClick={() => window.history.back()}>Back</Button>
                    <Button size="small" onClick={handleCheckout}>Checkout</Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default ArtworkView;
