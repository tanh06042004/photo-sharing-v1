import React, { useState } from "react";
import { Typography, Grid, Paper, TextField, Button, Box } from "@mui/material";
import axios from "axios";

function LoginRegister({ onLogin }) {
  // State cho Login
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // State cho Register
  const [newLoginName, setNewLoginName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [occupation, setOccupation] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");

  // Xử lý Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://zld62n-8082.csb.app/user/login",
        {
          login_name: loginName,
          password: password,
        }
      );
      onLogin(response.data);
      setLoginError("");
    } catch (err) {
      setLoginError(err.response?.data || "Login failed");
    }
  };

  // Xử lý Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    try {
      await axios.post("https://zld62n-8082.csb.app/user", {
        login_name: newLoginName,
        password: newPassword,
        first_name: firstName,
        last_name: lastName,
        location: location,
        description: description,
        occupation: occupation,
      });
      setRegisterSuccess("Registration successful! You can now login.");
      setRegisterError("");
      // Clear form
      setNewLoginName("");
      setNewPassword("");
      setConfirmPassword("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      setRegisterError(err.response?.data || "Registration failed");
      setRegisterSuccess("");
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      style={{ marginTop: "20px", padding: "20px" }}
    >
      {/* Cột Login */}
      <Grid item xs={12} md={5}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          {loginError && (
            <Typography color="error" style={{ marginBottom: 10 }}>
              {loginError}
            </Typography>
          )}
          <form onSubmit={handleLogin}>
            <TextField
              label="Login Name"
              fullWidth
              margin="normal"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              style={{ marginTop: "10px" }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>

      <Grid
        item
        xs={12}
        md={1}
        style={{ textAlign: "center", alignSelf: "center" }}
      >
        <Typography variant="h6">OR</Typography>
      </Grid>

      {/* Cột Register */}
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Register New User
          </Typography>
          {registerError && (
            <Typography color="error" style={{ marginBottom: 10 }}>
              {registerError}
            </Typography>
          )}
          {registerSuccess && (
            <Typography color="success.main" style={{ marginBottom: 10 }}>
              {registerSuccess}
            </Typography>
          )}

          <form onSubmit={handleRegister}>
            <TextField
              label="Login Name *"
              fullWidth
              margin="dense"
              value={newLoginName}
              onChange={(e) => setNewLoginName(e.target.value)}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Password *"
                  type="password"
                  fullWidth
                  margin="dense"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Confirm Password *"
                  type="password"
                  fullWidth
                  margin="dense"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name *"
                  fullWidth
                  margin="dense"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name *"
                  fullWidth
                  margin="dense"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
            </Grid>
            <TextField
              label="Location"
              fullWidth
              margin="dense"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
              label="Description"
              fullWidth
              margin="dense"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="Occupation"
              fullWidth
              margin="dense"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
            />

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              style={{ marginTop: "15px" }}
            >
              Register Me
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginRegister;
