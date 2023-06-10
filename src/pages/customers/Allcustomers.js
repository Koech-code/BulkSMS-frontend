import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import axios from "axios"

import { Button, TextField, Modal } from '@mui/material';
// import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
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

const Allcustomers = () => {

    const classes = useStyles();

    const [selectedCustomer, setSelectedCustomer] = useState({});

    const [customers, setCustomers] = useState([])

    const [open, setOpen] = useState(false);

    const handleOpen = (customer) => {
        setSelectedCustomer(customer);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        fetch("http://localhost:443/api/customer/customers", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCustomers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [])

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:443/api/customer/update/${selectedCustomer.id}`, {
                name: selectedCustomer.name,
                phoneNumber: selectedCustomer.phoneNumber,
                email: selectedCustomer.email,
                nationalIdCard: selectedCustomer.nationalIdCard
            }, {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(response);

            toast.success("Customers information updated successfully!", {
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

    const handleDelete = async (customerId) => {
        try {
            const response = await axios.delete(`https://3.83.201.151:7000/api/customer/delete/${customerId}`, {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log(response);

            toast.success("Successfully deleted", {
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
            toast.error("Failed to delete customer info.", {
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
    }

    return (
        <TableContainer component={Paper} className={classes.gridContainer}>
            <Table>
                <TableHead >
                    <TableRow >
                        <TableCell style={{ fontWeight: "800", fontSize: "18px" }}>ID</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Name</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Phone Number</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Email Address</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Nation ID Number</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Location</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Created</TableCell>
                        <TableCell style={{ fontWeight: "bolder", fontSize: "18px" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.map((customer) => (
                        <TableRow key={customer.id}>
                            <TableCell>{customer.id}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{customer.phoneNumber}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.nationalIdCard}</TableCell>
                            <TableCell>{customer.location}</TableCell>
                            <TableCell>{customer.createdAt}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => handleOpen(customer)}>
                                    <Edit />
                                </IconButton>

                                <IconButton color="secondary">
                                    <Delete onClick={() => handleDelete(customer.id)} />
                                </IconButton>

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

            <Modal open={open} onClose={handleClose} >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <div style={{ position: 'relative', background: '#fff', padding: '1rem', borderRadius: '8px', width: '400px' }}>
                        <Button onClick={handleClose} style={{ position: 'absolute', top: '0', right: '0', zIndex: 1 }}>
                            <CloseIcon />
                        </Button>

                        <TextField
                            label="Name"
                            value={selectedCustomer.name || ""}
                            onChange={(e) => setSelectedCustomer({ ...selectedCustomer, name: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Phone number"
                            value={selectedCustomer.phoneNumber || ""}
                            onChange={(e) => setSelectedCustomer({
                                ...selectedCustomer, phoneNumber: e.target.value
                            })}
                            fullWidth
                            margin="normal"
                        />

                        <TextField
                            label="Email address"
                            value={selectedCustomer.email || ""}
                            onChange={(e) => setSelectedCustomer({ ...selectedCustomer, email: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="National ID number"
                            value={selectedCustomer.nationalIdCard || ""}
                            onChange={(e) => setSelectedCustomer({ ...selectedCustomer, nationalIdCard: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Location"
                            value={selectedCustomer.location || ""}
                            onChange={(e) => setSelectedCustomer({ ...selectedCustomer, location: e.target.value })}
                            fullWidth
                            margin="normal"
                        />



                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>

                            <Button fullWidth onClick={(e) => handleSave(e, customers.id)} variant="contained" color="primary" >
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

export default Allcustomers;
