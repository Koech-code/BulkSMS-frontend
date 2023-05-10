import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

function AccountStatus() {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        fetch(
            "http://localhost:443/api/accounts/all", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setRequests(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <TableContainer component={Paper} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }} >ID</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>Wallet Address</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>Type of user</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>Balance</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: '800' }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requests.map((req) => (
                        <TableRow key={req.id}>
                            <TableCell style={{ width: '20px', textAlign: 'center' }}>{req.id}</TableCell>
                            <TableCell style={{ width: '350px', textAlign: 'center' }}>{req.walletAddress}</TableCell>
                            <TableCell style={{ width: '250px', textAlign: 'center', fontWeight: req.typeOfUser == 'admin' ? '800' : 'normal' }}>{req.typeOfUser}</TableCell>
                            <TableCell style={{ width: '250px', textAlign: 'center', fontWeight: '800' }}>{req.balance}</TableCell>
                            <TableCell style={{ width: '250px', textAlign: 'center' }}>{req.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}

export default AccountStatus;
