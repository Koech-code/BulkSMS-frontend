import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    TextField,
    Button,
    Grid,
    Typography,
    Link
} from '@material-ui/core';
import axios from 'axios';

function CustomerRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nationalID, setNationalID] = useState("");
    const [location, setLocation] = useState("");
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

        // Validate name
        if (!name) {
            formIsValid = false;
            errors["name"] = "Please enter your name";
        }

        // validate phone number
        if (!phoneNumber) {
            formIsValid = false;
            errors["phoneNumber"] = "Please enter your phone number";
        } else if (!/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
            formIsValid = false;
            errors["phoneNumber"] = "Please enter a valid phone number starting with '+' and followed by a country code and phone number";
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
            formData.append("phoneNumber", phoneNumber);
            formData.append("nationalID", nationalID);
            formData.append("name", name);

            try {
                const response = await axios.post("http://localhost:443/api/customer/register", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {

                    alert("Parent account created successfully!");
                } else {
                    alert("Failed to create parent account");
                }
            } catch (error) {
                console.error(error);
                alert("Failed to create account");
            }
        }
    };

    return (
        <Grid container justify="center" alignItems="center" style={{ height: '40px', paddingLeft: "150px" }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardHeader title="Create account" />
                    <CardContent>
                        <form onSubmit={handleLogin}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Typography variant="body1">Name</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        value={name}
                                        onChange={(nm) => setName(nm.target.value)}
                                        error={errors.name ? true : false}
                                        helperText={errors.name}
                                    />
                                </Grid>
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
                                    <Typography variant="body1">Phone Number</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(phone) => setPhoneNumber(phone.target.value)}
                                        error={errors.phoneNumber ? true : false}
                                        helperText={errors.phoneNumber}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">National ID</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        value={nationalID}
                                        onChange={(nid) => setNationalID(nid.target.value)}
                                    // error={errors.password ? true : false}
                                    // helperText={errors.password}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Location</Typography>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="text"
                                        value={location}
                                        onChange={(location) => setLocation(location.target.value)}
                                    // error={errors.password ? true : false}
                                    // helperText={errors.password}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">Password</Typography>
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
                                <Typography align="center">
                                    Already have an account? <Link href="/login-customer">Login</Link>
                                </Typography>
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
                                        Register
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

export default CustomerRegister;
