import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  IconButton,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Key, Edit, Delete, Lock } from "@mui/icons-material";
import { TableContainer } from "@mui/material";

const Logo = require("../../BosskidsLogo.jpg");

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "200px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
      marginLeft: "6",
      marginRight: "6",
    },
  },
}));

const colors = {
  success: {
    color: "green",
  },
  warning: {
    color: "orange",
  },
  error: {
    color: "red",
  },
};

const Allcustomers = () => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [selectedvendorIds, setSelectedvendorIds] = useState([]);

  // const [page, pagechange] = useState(0)
  const [rowperpage, rowperpagechange] = useState(5);
  const [contacts, setContacts] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedvendorIds;

    if (event.target.checked) {
      newSelectedvendorIds = vendors.map((vendor) => vendor.id);
    } else {
      newSelectedvendorIds = [];
    }

    setSelectedvendorIds(newSelectedvendorIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedvendorIds.indexOf(id);
    let newSelectedvendorIds = [];

    if (selectedIndex === -1) {
      newSelectedvendorIds = newSelectedvendorIds.concat(selectedvendorIds, id);
    } else if (selectedIndex === 0) {
      newSelectedvendorIds = newSelectedvendorIds.concat(
        selectedvendorIds.slice(1)
      );
    } else if (selectedIndex === selectedvendorIds.length - 1) {
      newSelectedvendorIds = newSelectedvendorIds.concat(
        selectedvendorIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedvendorIds = newSelectedvendorIds.concat(
        selectedvendorIds.slice(0, selectedIndex),
        selectedvendorIds.slice(selectedIndex + 1)
      );
    }

    setSelectedvendorIds(newSelectedvendorIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (event) => {
    rowperpagechange(+event.target.value);
    setPage(0);
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Validate name
    if (!name) {
      formIsValid = false;
      errors["name"] = "Please enter customer's name";
    }

    // Validate phoneNumber
    if (!phoneNumber) {
      formIsValid = false;
      errors["phoneNumber"] = "Please enter your phoneNumber";
    } else if (!phoneNumber.startsWith("+254")) {
      formIsValid = false;
      errors["phoneNumber"] = "Phone number must start with +254";
    } else if (!["7", "1", "2"].includes(phoneNumber.charAt(4))) {
      formIsValid = false;
      errors["phoneNumber"] =
        "Phone number must have '7', '1', or '2' after +254";
    } else if (phoneNumber.replace("+", "").length !== 12) {
      formIsValid = false;
      errors["phoneNumber"] = "Phone number must have a total of 12 digits";
    }

    setErrors(errors);
    return formIsValid;
  };
  const handlePostContact = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("location", location);
      formData.append("phoneNumber", phoneNumber);

      // Get the token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        // Handle the case when the token is not present in local storage
        toast.error("Token not found. Please log in first.", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      try {
        const response = await axios.post(
          "https://7769-102-219-208-66.ngrok-free.app/api/admit/contact", // Update the endpoint URL for posting customer contacts
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);

        if (response.status === 200) {
          toast.success("Contact added successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // Clear the form state variables
          setName("");
          setLocation("");
          setPhoneNumber("");
        } else {
          toast.error("Failed to add contact", {
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
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          const errorMessage = error.response.data.message;
          toast.error(errorMessage, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("An error occurred while adding the contact", {
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
    }
  };

  useEffect(() => {
    // Function to fetch data from the API and update the state
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://7769-102-219-208-66.ngrok-free.app/api/customers"
        );
        if (response.data && response.data.success === "success") {
          setContacts(response.data.contacts);
        } else {
          // Handle API error or empty response
          console.error("Failed to fetch data from API");
        }
      } catch (error) {
        // Handle fetch error
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function to fetch data when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <Grid
      container
      spacing={2}
      style={{ display: "flex", position: "relative" }}
    >
      <Grid item xs={12} md={8}>
        <Box className={classes.gridContainer}>
          <Card>
            <TableContainer sx={{ maxHeight: 450 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts
                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                    .map((contact) => (
                      <TableRow hover key={contact.id}>
                        <TableCell>{contact.id}</TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.phoneNumber}</TableCell>
                        <TableCell>{contact.location}</TableCell>
                        <TableCell>
                          <Grid container>
                            <Grid item xs={6} md={6}>
                              <IconButton size="small" style={colors.success}>
                                <Key size={24} />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <IconButton size="small" style={colors.warning}>
                                <Edit size={24} />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <IconButton size="small" style={colors.error}>
                                <Delete size={24} />
                              </IconButton>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <IconButton size="small" color="primary">
                                <Lock size={24} />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              page={page}
              rowsPerPage={rowperpage}
              count={contacts.length}
              component={"div"}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPage}
            ></TablePagination>
          </Card>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <Card>
          <CardHeader
            title={
              <Typography
                variant="h5"
                align="center"
                style={{ fontWeight: "bold", color: "#00A86B" }}
              >
                Admit Customer
              </Typography>
            }
            alignItems="center"
          />

          <CardContent>
            <form onSubmit={handlePostContact}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={errors.name ? true : false}
                    helperText={errors.name}
                    variant="outlined"
                    sx={{ m: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    error={errors.phoneNumber ? true : false}
                    helperText={errors.phoneNumber}
                    variant="outlined"
                    sx={{ m: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1"></Typography>
                  <TextField
                    fullWidth
                    label="Location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
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
                    style={{ backgroundColor: "#00A86B" }}
                  >
                    Admit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
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
    </Grid>
  );
};

export default Allcustomers;
