import { useState } from "react";
import axios from 'axios';
import {
    Box,
    TextField,
    Button,
    Container,
    Typography,
    Link
} from "@mui/material";

const Parents = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [nationalID, setNationalID] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("phoneNumber", phoneNumber);
        formData.append("email", email);
        formData.append("nationalID", nationalID);
        formData.append("password", password);

        try {
            await axios.post("http://localhost:443/api/parent/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzeXN0ZW1AYm9zc2tpZHMubmV0IiwiaWF0IjoxNjgzNDA4ODIwLCJleHAiOjE2ODM0NTg4MjB9.o4eTjAZkEEQ-wOmwrUaboZPlw8fJ9Lv5IjF0XwCjOUU`,
                },
            });
            console.log(formData)

            alert("Parent Account created successfully!");
            // window.location.href = "/activate";
        } catch (error) {
            console.error(error);
            alert("Failed to create parent account.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                Parents Register
            </Typography>
            <Box >
                <TextField
                    fullWidth
                    label="Name"

                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Phone Number (e.g +254745441222)"

                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="National ID Number"

                    value={nationalID}
                    onChange={(e) => setNationalID(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Email"

                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Password"

                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                />
                <Typography align="center">
                    Already have an account? <Link href="/activate">Activate</Link>
                </Typography>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mx: "auto", display: "block" }}
                    onClick={handleSubmit}
                // onClick={() => alert("On register success, redirect to request acount activation page")}
                >
                    Submit
                </Button>
            </Box>
        </Container>


    );
};

export default Parents;
