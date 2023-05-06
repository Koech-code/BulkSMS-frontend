import React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';

const CheckoutArt = () => {
    return (
        <div style={{ padding: '24px', backgroundColor: '#F5F5F5', minHeight: 'calc(100vh - 64px)' }}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={12} md={8}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Checkout
                    </Typography>
                    <form style={{ maxWidth: '500px', margin: '0 auto' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField label="Name" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Email" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Phone" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="Address" fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="City" fullWidth required />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField label="Zip Code" fullWidth required />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    style={{ marginTop: '16px' }}
                                >
                                    Submit Order
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default CheckoutArt;
