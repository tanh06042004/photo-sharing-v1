import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function TopBar() {
  const location = useLocation();
  const params = useParams();

  // Xác định context để hiển thị bên phải
  const getContext = () => {
    const path = location.pathname;

    if (path.startsWith("/users/") && params.userId) {
      const user = models.userModel(params.userId);
      if (user) {
        return `${user.first_name} ${user.last_name}`;
      }
    } else if (path.startsWith("/photos/") && params.userId) {
      const user = models.userModel(params.userId);
      if (user) {
        return `Photos of ${user.first_name} ${user.last_name}`;
      }
    }

    return "Photo Sharing App";
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        {/* Tên của bạn bên trái */}
        <Typography variant="h6">B22DCAT022</Typography>

        {/* Context bên phải */}
        <Typography variant="h6">{getContext()}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
