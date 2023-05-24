import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, TextField, Input, Button, Typography, Box } from '@material-ui/core';

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

function SendRequest() {
    const classes = useStyles();

    const { ID } = useParams();
    const [frontNationalIdPhoto, setFrontNationalIdPhoto] = useState(null)
    const [backNationalIdPhoto, setBackNationalIdPhoto] = useState(null)
    const [userProfilePhoto, setUserProfilePhoto] = useState(null)

    const [formData, setFormData] = useState({
        walletAddress: '',
        typeOfUser: '',
        status: ''
    });
    const [isDataFetched, setIsDataFetched] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:443/api/activation/send-request/${ID}`);
                const data = response.data;
                console.log(data)
                setFormData({
                    walletAddress: data.account.walletAddress,
                    typeOfUser: data.account.typeOfUser,
                    status: data.account.status
                });
                setIsDataFetched(true);
            } catch (error) {
                console.error(error);
            }
        };

        if (!isDataFetched) {
            fetchData();
        }
    }, [ID, isDataFetched]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.status === 2 || formData.status === -1) {
            const form = new FormData();
            form.append("walletAddress", formData.walletAddress);
            form.append("typeOfUser", formData.typeOfUser);
            form.append("status", formData.status);
            form.append("frontNationalIdPhoto", frontNationalIdPhoto);
            form.append("backNationalIdPhoto", backNationalIdPhoto);
            form.append("userProfilePhoto", userProfilePhoto);

            try {
                await axios.post(`http://localhost:443/api/activation/send-request/${ID}`, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        // Authorization: `Bearer ${localStorage.getItem("token")} `,
                    },
                });

                toast.success("Activation request sent successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                window.location.href = "/customer/login";
            } catch (error) {
                console.error(error);
                toast.error("Failed to send activation request.", {
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
        } else if (formData.status === 1) {
            toast.info("Your account is already active.", {
                position: "top-center",
                autoClose: 3000,
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
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }} className={classes.gridContainer}>
            <Card style={{ width: '60%' }}>
                <CardContent>
                    <Typography variant="body1">Wallet Address</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={formData.walletAddress}
                    />
                    <Typography variant="body1">Type of User</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={formData.typeOfUser}
                    />
                    <Typography variant="body1">Status</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={formData.status}
                    />
                    <Box style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 8 }}>
                        <Box style={{ width: '230px' }}>
                            <Typography>National ID (Front)</Typography>
                            <TextField
                                type="file"
                                onChange={(img1) => setFrontNationalIdPhoto(img1.target.files[0])}
                                variant="outlined"
                                margin="normal"
                            />
                        </Box>

                        {/* <Box style={{ width: '10px' }}></Box> */}
                        <Box style={{ width: '230px' }}>
                            <Typography>National ID (Back)</Typography>
                            <TextField
                                type="file"
                                variant="outlined"
                                margin="normal"
                                onChange={(img2) => setBackNationalIdPhoto(img2.target.files[0])}
                            />
                        </Box>
                        <Box style={{ width: '230px' }}>
                            <Typography>Your profile photo</Typography>
                            <TextField
                                type="file"
                                variant="outlined"
                                margin="normal"
                                onChange={(proofilePhoto) => setUserProfilePhoto(proofilePhoto.target.files[0])}
                            />
                        </Box>
                    </Box>

                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            style={{
                                backgroundColor: '#00A86B',
                            }}
                        >
                            Send Activation Request
                        </Button>
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

                </CardContent>
            </Card>
        </Box>

    );

}

export default SendRequest;
