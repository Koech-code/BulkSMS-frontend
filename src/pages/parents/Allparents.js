import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import axios from "axios"

import { Button, TextField, Modal } from '@mui/material';
// import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Allparents = () => {

    const [selectedParent, setSelectedParent] = useState({});

    const [parents, setParents] = useState([])

    const [open, setOpen] = useState(false);

    const handleOpen = (parent) => {
        setSelectedParent(parent);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        fetch("http://localhost:443/api/parent/parents", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setParents(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [])

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:443/api/parent/update/${selectedParent.id}`, {
                name: selectedParent.name,
                phoneNumber: selectedParent.phoneNumber,
                email: selectedParent.email,
                nationalID: selectedParent.nationalID
            }, {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(response);

            toast.success("Parent information updated successfully!", {
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
            toast.error("Failed to update parent account.", {
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
        <TableContainer component={Paper} style={{ paddingLeft: '200px' }}>
            <Table>
                <TableHead >
                    <TableRow >
                        <TableCell style={{ fontWeight: "800", fontSize: "18px" }}>ID</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Name</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Phone Number</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Email Address</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Nation ID Number</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Created</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {parents.map((parent) => (
                        <TableRow key={parent.id}>
                            <TableCell>{parent.id}</TableCell>
                            <TableCell>{parent.name}</TableCell>
                            <TableCell>{parent.phoneNumber}</TableCell>
                            <TableCell>{parent.email}</TableCell>
                            <TableCell>{parent.nationalID}</TableCell>
                            <TableCell>{parent.createdAt}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => handleOpen(parent)}>
                                    <Edit />
                                </IconButton>

                                <IconButton color="secondary">
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Modal open={open} onClose={handleClose} >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <div style={{ position: 'relative', background: '#fff', padding: '1rem', borderRadius: '8px', width: '400px' }}>
                        <Button onClick={handleClose} style={{ position: 'absolute', top: '0', right: '0', zIndex: 1 }}>
                            <CloseIcon />
                        </Button>

                        <TextField
                            label="Name"
                            value={selectedParent.name || ""}
                            onChange={(e) => setSelectedParent({ ...selectedParent, name: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Phone number"
                            value={selectedParent.phoneNumber || ""}
                            onChange={(e) => setSelectedParent({
                                ...selectedParent, phoneNumber: e.target.value
                            })}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Email address"
                            value={selectedParent.email || ""}
                            onChange={(e) => setSelectedParent({ ...selectedParent, email: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="National ID number"
                            value={selectedParent.nationalID || ""}
                            onChange={(e) => setSelectedParent({ ...selectedParent, nationalID: e.target.value })}
                            fullWidth
                            margin="normal"
                        />



                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>

                            <Button fullWidth onClick={(e) => handleSave(e, parents.id)} variant="contained" color="primary" >
                                Save
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
                        </div>
                    </div>
                </div>
            </Modal>
        </TableContainer>
    );
};

export default Allparents;
