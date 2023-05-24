
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Grid,
    Typography
} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Logo = require("../../BosskidsLogo.jpg")

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        height: '100vh',
        // paddingLeft: '150px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0',
            marginLeft: '6',
            marginRight: '6'
        },
    }
}));

const AdminLogin = () => {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        // Validate email
        if (!email) {
            formIsValid = false;
            errors["email"] = "Please enter your email address";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formIsValid = false;
            errors["email"] = "Please enter a valid email address";
        }

        // Validate password
        if (!password) {
            formIsValid = false;
            errors["password"] = "Please enter your password";
        }

        setErrors(errors);
        return formIsValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            try {
                const response = await axios.post("http://localhost:443/admin/auth/login", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    // Extract token from response
                    const token = response.data.token;

                    // Save token in local storage
                    localStorage.setItem("token", token);
                    toast.success("Logged in successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    setTimeout(() => {
                        window.location.href = "/activation/requests";
                    }, 2000); // Delay the redirection for the same duration as the autoClose time

                } else {

                    toast.error("Failed to log in", {
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
            } catch (error) {
                console.error(error);
                toast.error("Failed to log in", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // alert("Failed to log in");
            }
        }
    };


    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.gridContainer}
        >
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardHeader
                        title={
                            <Typography variant="h5" align="center" style={{ fontWeight: 'bold', color: '#00A86B' }}>
                                Admin Login
                            </Typography>
                        }
                        alignItems="center"
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={Logo} alt="Logo" style={{ maxWidth: '150px', maxHeight: '150px', width: '100%', height: 'auto' }} />
                    </div>
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        value={email}
                                        onChange={(mail) => setEmail(mail.target.value)}
                                        error={errors.email ? true : false}
                                        helperText={errors.email}
                                        variant="outlined"
                                        sx={{ m: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1"></Typography>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(pass) => setPassword(pass.target.value)}
                                        error={errors.password ? true : false}
                                        helperText={errors.password}
                                        variant="outlined"
                                        sx={{ m: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        style={{ backgroundColor: '#00A86B' }}
                                    >
                                        Login
                                    </Button>
                                    <ToastContainer
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
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    )
}

export default AdminLogin;