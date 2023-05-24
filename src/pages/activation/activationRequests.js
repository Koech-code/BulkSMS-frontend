import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Table, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@material-ui/core';
import axios from 'axios';
// import { Modal } from '@material-ui/core';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        height: '100vh',
        paddingLeft: '200px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0',
        },

    },
}));


function ActivationRequests() {
    const classes = useStyles();

    const [activationRequests, setActivationRequests] = useState([])

    useEffect(() => {
        fetch(
            "http://localhost:443/api/activation/activation-requests", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setActivationRequests(data);
            })
            .catch(error => {
                console.log('Error:', error.response.data.message);
            });
    }, []);


    const handleActivate = async (e, requestId) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:443/api/activation/treat-request/${requestId}`, { status: 1 }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(response);

            toast.success("Account activated successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.message, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }
    };

    return (
        <TableContainer
            container
            justify="center"
            alignItems="center"
            className={classes.gridContainer}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: '800' }}>Profile Photo</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>National ID (Front) </TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>National ID (Back) </TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>Wallet Address</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>Status</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>Type of User</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>Created</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activationRequests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell style={{ width: '20px', textAlign: 'center' }}>
                                <Box style={{ display: 'flex', alignItems: 'center' }}>
                                    {request.userProfilePhoto ? (
                                        <img
                                            alt={request.name}
                                            src={`http://localhost:443/${request.userProfilePhoto}`}
                                            style={{
                                                width: '60%',
                                                height: '45px',
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                borderRadius: '50%',
                                            }}

                                        />
                                    ) : (
                                        <Avatar >
                                        </Avatar>
                                    )}

                                </Box>
                            </TableCell>
                            <TableCell style={{ width: '10px', textAlign: 'center' }}>
                                <img src={`http://localhost:443/${request.frontNationalIdPhoto}`} alt="National ID (front)" style={{ width: "80%", height: "50px", objectFit: "cover", objectPosition: "center" }} />
                            </TableCell>
                            <TableCell style={{ width: '10px', textAlign: 'center' }}>
                                <img src={`http://localhost:443/${request.backNationalIdPhoto}`} alt="National ID (back)" style={{ width: "80%", height: "50px", objectFit: "cover", objectPosition: "center" }} />
                            </TableCell>
                            <TableCell style={{ width: '15%', textAlign: 'center' }}>{request.walletAddress}</TableCell>

                            <TableCell style={{ width: '20px', textAlign: 'center', color: request.status == 1 ? "#00A86B" : request.status == 2 ? 'orange' : 'red' }}>
                                {request.status == 1 && 'Active'}
                                {request.status == 2 && 'Pending'}
                                {request.status == -1 && 'Declined'}
                            </TableCell>
                            <TableCell style={{ width: '20px', textAlign: 'center', fontWeight: request.typeOfUser == 'admin' ? '800' : 'normal' }}>{request.typeOfUser}</TableCell>
                            <TableCell style={{ width: '15%', textAlign: 'center' }}>{request.createdAt}</TableCell>
                            <TableCell style={{ width: '20px', textAlign: 'center' }}>
                                <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: '#00A86B',
                                    }} color="primary"
                                    onClick={(e) => handleActivate(e, request.id)}

                                >
                                    Activate
                                </Button>

                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
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
        </TableContainer>
    );
}

export default ActivationRequests;
