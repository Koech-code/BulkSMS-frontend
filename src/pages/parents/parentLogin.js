import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Grid,
    Typography
} from '@material-ui/core';
import axios from 'axios';

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
                    <CardHeader title="Parents Login" />
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Typography variant="body1">Email Address</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        value={email}
                                        onChange={(mail) => setEmail(mail.target.value)}
                                        error={errors.email ? true : false}
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Password:</Typography>
                                    <TextField
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
