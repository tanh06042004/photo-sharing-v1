import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function TopBar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openUpload, setOpenUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // Link Backend hiện tại của bạn
  const BACKEND_URL = "https://zld62n-8082.csb.app";

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/user/logout`);
      setUser(null);
      navigate("/user/login"); // Logout xong chuyển về trang login
    } catch (err) {
      console.error("Logout failed:", err);
      setUser(null);
    }
  };

  // Xử lý Upload ảnh
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post(`${BACKEND_URL}/photos/new`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Photo uploaded successfully!");
      setOpenUpload(false);
      setSelectedFile(null);

      // --- LOGIC CHUYỂN HƯỚNG ---
      if (user) {
        const userPhotosPath = `/photos/${user._id}`;

        // Nếu đang ở trang ảnh của mình thì reload để hiện ảnh mới
        if (location.pathname === userPhotosPath) {
          window.location.reload();
        } else {
          // Nếu đang ở trang khác thì chuyển về trang ảnh của mình
          navigate(userPhotosPath);
        }
      }
      // --------------------------
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h6">B22DCAT022</Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <>
              <Typography variant="h6" style={{ marginRight: "20px" }}>
                Hi {user.first_name}
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                style={{ marginRight: "10px" }}
                onClick={() => setOpenUpload(true)}
              >
                Add Photo
              </Button>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Typography variant="h6">Please Login</Typography>
          )}
        </div>

        <Dialog open={openUpload} onClose={() => setOpenUpload(false)}>
          <DialogTitle>Upload New Photo</DialogTitle>
          <DialogContent>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              style={{ marginTop: "10px" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenUpload(false)}>Cancel</Button>
            <Button onClick={handleUpload} color="primary" variant="contained">
              Upload
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
