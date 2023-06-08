import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

const ArtworkCheckoutPage = ({ artworks }) => {

    const { id } = useParams(); // get the id of the selected artwork from the URL

    const selectedArtwork = artworks.find((artwork) => artwork.id === parseInt(id));

    const handlePurchase = () => {
        // handle the purchase logic here
        alert(`You have purchased ${selectedArtwork.title} for BK${selectedArtwork.price}.`);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 600, m: 2 }}>
                <CardMedia component="img" height="400" image={`https://3.83.201.151:7000/${selectedArtwork.image_url}`} alt={selectedArtwork.title} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {selectedArtwork.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {selectedArtwork.description}
                    </Typography>
                    <Typography variant="body2" color="secondary" sx={{ fontWeight: 'bold' }}>
                        Price: <Box component="span" sx={{ fontWeight: 'semibold' }}>BK{selectedArtwork.price}</Box>
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary" onClick={handlePurchase}>
                        Purchase
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
};

export default ArtworkCheckoutPage;
