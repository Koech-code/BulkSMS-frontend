import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Grid,
    Typography,
    Box
} from '@material-ui/core';
import axios from 'axios';
const Logo = require("../../BosskidsLogo.jpg")

function Login() {
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
                const response = await axios.post("http://localhost:443/api/parent/login", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    // Extract token from response
                    const token = response.data.token;

                    // Save token in local storage
                    localStorage.setItem("token", token);

                    alert("Logged in successfully!");
                    // window.location.href = "/activate";
                } else {
                    alert("Failed to log in");
                }
            } catch (error) {
                console.error(error);
                alert("Failed to log in");
            }
        }
    };



    return (
        <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardHeader title={
                        <Typography variant="h5" style={{ textAlign: "center", fontWeight: 800, color: "#00A86B" }}>
                            Parent Login
                        </Typography>
                    } />
                    <Box style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={Logo} alt="Logo" style={{ width: '150px', height: '150px' }} />
                    </Box>
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        variant="outlined"
                                        value={email}
                                        onChange={(mail) => setEmail(mail.target.value)}
                                        error={errors.email ? true : false}
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Password"
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        value={password}
                                        onChange={(pass) => setPassword(pass.target.value)}
                                        error={errors.password ? true : false}
                                        helperText={errors.password}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        style={{
                                            backgroundColor: '#00A86B',
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Login;
