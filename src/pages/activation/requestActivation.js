// import { useState } from "react";
// import axios from 'axios';
// import {
//     Box,
//     TextField,
//     Button,
//     Container,
//     Typography,
//     Link,
//     Select,
//     MenuItem
// } from "@mui/material";
// // Redirect to homepage on success
// // import { DropzoneArea } from 'material-ui-dropzone';

// const ActivateParentAcoount = () => {
//     const [frontNationalIdPhoto, setFrontNationalIdPhoto] = useState("");
//     const [backNationalIdPhoto, setBackNationalIdPhoto] = useState("");


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("frontNationalIdPhoto", frontNationalIdPhoto);
//         formData.append("backNationalIdPhoto", backNationalIdPhoto);


//         try {
//             await axios.post("http://localhost:443/api/activate/send-request/${ID}", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     Authorization: `Token ${localStorage.getItem("token")}`,
//                 },
//             });
//             console.log(formData)
//             alert("Account activated successfully!");
//         } catch (error) {
//             console.error(error);
//             alert("Failed to activate account.");
//         }
//     };


//     // const PENDING = 2
//     const ACTIVE = 1
//     return (
//         <Container maxWidth="sm">
//             <Typography variant="h4" align="center" sx={{ mb: 3 }}>
//                 Request activation
//             </Typography>
//             <Box >
//                 <Typography>Upload your national ID card (front)</Typography>
//                 <TextField
//                     // label="Image"

//                     onChange={(frontimg) => setFrontNationalIdPhoto(frontimg.target.files[0])}
//                     // variant="outlined"
//                     type="file"
//                     sx={{ m: 2 }}
//                     required
//                 />
//                 <Typography>Upload your national ID card (back)</Typography>
//                 <TextField
//                     // label="Image"

//                     onChange={(backimg) => setBackNationalIdPhoto(backimg.target.files[0])}
//                     // variant="outlined"
//                     type="file"
//                     sx={{ m: 2 }}
//                     required
//                 />
//                 <Button
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     sx={{ mx: "auto", display: "block" }}
//                     onClick={handleSubmit}
//                 // onClick={() => alert("On register success, redirect to request acount activation page")}
//                 >
//                     Send
//                 </Button>
//             </Box>
//         </Container>
//     );
// };

// export default ActivateParentAcoount;

import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import axios from 'axios';

// import AddIcon from "@mui/icons-material/Add";
const ActivateParentAcoount = () => {
    const [title, setTitle] = useState("");
    const [image_url, setImage_url] = useState(null);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [arts, setArts] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("image_url", image_url);
        formData.append("description", description);
        formData.append("price", price);

        try {
            await axios.post("http://localhost:443/api/artworks/child/${childId}/artwork", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")} `,
                },
            });

            alert("Artwork created successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to create art.");
        }
    };

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/events/all-events/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setArts(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    return (

        <Box>
            <Box>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Box sx={{ maxWidth: 300 }}>

                        <TextField
                            label="Title"
                            value={title}
                            onChange={(title) => setTitle(title.target.value)}
                            variant="outlined"
                            sx={{ m: 2 }}
                            required
                        />
                        <TextField
                            label="Descriprion"
                            value={description}
                            onChange={(desc) => setDescription(desc.target.value)}
                            variant="outlined"
                            sx={{ m: 2 }}
                            required
                        />
                    </Box>
                    <Box sx={{ maxWidth: 300 }}>

                        <TextField
                            // label="Image"
                            // value={image_url}
                            onChange={(img) => setImage_url(img.target.files[0])}
                            // variant="outlined"
                            type="file"
                            sx={{ m: 2 }}
                            required
                        />
                        <TextField
                            label="Price"
                            value={price}
                            onChange={(price) => setPrice(price.target.value)}
                            variant="outlined"
                            sx={{ m: 2 }}
                        />
                    </Box>

                </Box>
                <Button sx={{ mx: "auto", display: "block" }} variant="contained" onClick={handleSubmit}>
                    Post
                </Button>
            </Box>


        </Box>
    );
}
export default ActivateParentAcoount;
