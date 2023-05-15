import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

const ArtworksCard = () => {
    const navigate = useNavigate();

    const navigateArtCheckout = () => {
        // 👇️ navigate to /checkout
        navigate("/register");
    };

    const openImage = (id) => {
        navigate(`/artwork/${id}`);
    };

    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:443/api/artworks/getartworks", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setArtworks(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', paddingLeft: "200px" }}>
            {artworks.map((artwork) => (
                <Card sx={{ maxWidth: 345, m: 2 }} key={artwork.id}>
                    <CardMedia
                        component="img"
                        height="140"
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
                            Price: <Box component="span" sx={{ fontWeight: 'semibold' }}>BK {artwork.price}</Box>
                        </Typography>

                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button size="small" onClick={() => openImage(artwork.id)}>View</Button>
                        <div onClick={navigateArtCheckout} sx={{ display: 'flex' }}>
                            <IconButton sx={{ borderRadius: 2, bgcolor: '#3f51b5', color: '#fff', '&:hover': { bgcolor: '#2c387e' } }}>
                                <ShoppingCartIcon />
                                <Typography variant="button" sx={{ ml: 1 }}>
                                    Buy
                                </Typography>
                            </IconButton>
                        </div>

                    </CardActions>

                </Card>
            ))}
        </Box>
    );
}

export default ArtworksCard;
