import { useState } from "react";
import axios from 'axios';
import {
    Box,
    TextField,
    Button,
    Container,
    Typography,
    Link,
    Select,
    MenuItem
} from "@mui/material";
// Redirect to homepage on success
import { DropzoneArea } from 'material-ui-dropzone';

const ActivateParentAcoount = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [nationalID, setNationalID] = useState("");
    const [password, setPassword] = useState("");
    const [image_url, setImage_url] = useState('');


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
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            });
            console.log(formData)
            alert("Parent Account created successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to create parent account.");
        }
    };

    // walletAddress: DataTypes.STRING,
    //     userType: DataTypes.STRING,
    //         status: DataTypes.STRING,
    //             frontNationalIdPhoto: DataTypes.STRING,
    //                 backNationalIdPhoto: DataTypes.STRING,

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                Activate Account?
            </Typography>
            <Box >
                <TextField
                    fullWidth
                    label="Wallet Address (e.g 1WA6yAdy7kZW4pxziJv6aYFyyiXU2zihEEMELG)"
                    name="name"
                    value={name}
                    onChange={(name) => setName(name.target.value)}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                />


                <TextField
                    fullWidth
                    label="Type of user"
                    name="name"
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    select
                >
                    <MenuItem value="parent">Parent</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                </TextField>

                <TextField
                    // label="Image"
                    // value={image_url}
                    // onChange={(img) => setImage_url(img.target.files[0])}
                    // variant="outlined"
                    type="file"
                    sx={{ m: 2 }}
                    required
                />

                <TextField
                    // label="Image"
                    // value={image_url}
                    // onChange={(img) => setImage_url(img.target.files[0])}
                    // variant="outlined"
                    type="file"
                    sx={{ m: 2 }}
                    required
                />

                <DropzoneArea
                    acceptedFiles={['image/*']}
                    dropzoneText="Drag and drop an image here or click"
                    onChange={(files) => console.log(files)}
                // onChange={(img) => setImage_url(img.target.files[0])}
                />


                <TextField
                    fullWidth
                    label="Account Status"
                    name="name"
                    // value={nationalID}
                    // onChange={(pId) => setNationalID(pId.target.value)}
                    margin="normal"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    defaultValue="PENDING"
                />


                <Typography align="center">
                    Have an active account? <Link href="/parent-login">Login</Link>
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

export default ActivateParentAcoount;
