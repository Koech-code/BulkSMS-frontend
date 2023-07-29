import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import axios from "axios";
const Logo = require("../../BosskidsLogo.jpg");

function CustomerLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    // Validate name
    if (!name) {
      formIsValid = false;
      errors["name"] = "Please enter your name address";
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
      formData.append("name", name);
      formData.append("password", password);

      try {
        const response = await axios.post(
          "http://localhost:6000/api/admin/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          // Save the token in local storage
          localStorage.setItem("token", response.data.token);

          toast.success("Logged in successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            window.location.href = "/artworks";
          }, 2000); // Delay the redirection for the same duration as the autoClose time
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
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card>
          <CardHeader
            title={
              <Typography
                variant="h5"
                style={{
                  textAlign: "center",
                  fontWeight: 800,
                  color: "#00A86B",
                }}
              >
                Customer Login
              </Typography>
            }
          />

          <Box style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={Logo}
              alt="Logo"
              style={{ width: "150px", height: "150px" }}
            />
          </Box>
          <CardContent>
            <form onSubmit={handleLogin}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(mail) => setName(mail.target.value)}
                    error={errors.name ? true : false}
                    helperText={errors.name}
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
                      backgroundColor: "#00A86B",
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
}

export default CustomerLogin;
