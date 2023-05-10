import React from 'react';
import { Button, Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function RegistrationPage() {
    return (
        <Container maxWidth="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '4rem' }}>
            <Typography variant="h4" gutterBottom>
                Register as
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register-parent"
                style={{ margin: '1rem' }}
            >
                Parent
            </Button>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/register-customer"
                style={{ margin: '1rem' }}
            >
                Customer
            </Button>
        </Container>
    );
}

export default RegistrationPage;
