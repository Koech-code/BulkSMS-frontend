import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Button, TextField, Typography, Container, Box, Card, CardContent } from '@material-ui/core';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'sweetalert2/dist/sweetalert2.min.css';

const MySwal = withReactContent(Swal);

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingLeft: '200px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0',
        },

    },
}));
function Withdraw() {
    const classes = useStyles();

    const [amount, setAmount] = useState('');
    const [withdrawalStatus, setWithdrawalStatus] = useState('');

    const handleSuccess = () => {
        MySwal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Your withdrawal was successful!',
            customClass: {
                container: 'my-swal-container',
                popup: 'my-swal-popup',
            },
        })
    }

    const handleError = () => {
        MySwal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Your withdrawal was not successful!',
            customClass: {
                container: 'my-swal-container',
                popup: 'my-swal-popup',
            },
        })
    }

    const handleWithdrawal = async () => {
        try {
            const response = await axios.post('https://3.83.201.151:7000/api/v1.1/wallet/withdraw', {
                amount,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")} `,
                },

            });
            // setWithdrawalStatus(response.data.message);
            handleSuccess();
        } catch (error) {
            console.error('Withdrawal failed:', error);
            handleError();
            // setWithdrawalStatus('Withdrawal failed');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }} className={classes.gridContainer}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Withdraw from Stripe
                    </Typography>

                    <TextField
                        label="Amount ($)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                    <Box display="flex" justifyContent="center" marginTop="1rem">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleWithdrawal}
                            style={{ marginTop: '1rem', margin: 'auto' }}
                        >
                            Withdraw
                        </Button>
                    </Box>
                    <Typography variant="subtitle1" style={{ marginTop: '1rem', textAlign: 'center' }}>
                        {withdrawalStatus}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Withdraw;
