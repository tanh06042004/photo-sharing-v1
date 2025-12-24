import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Button, Box } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import axios from "axios"; // Thay fetchModel bằng axios
import "./styles.css";
function UserDetail({ currentUser }) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  // const [currentUser] = useState(null);
  useEffect(() => {
    // Gọi API lấy chi tiết user từ Backend thật
    const url = `https://zld62n-8082.csb.app/user/${userId}`;

    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user detail:", error);
      });
  }, [userId]); // Chạy lại khi userId thay đổi

  if (!user) {
    return (
      <Typography variant="h6" style={{ padding: "20px" }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Card style={{ margin: "20px" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>

        <Typography variant="body1" color="textSecondary" paragraph>
          <strong>Location:</strong> {user.location}
        </Typography>

        <Typography variant="body1" color="textSecondary" paragraph>
          <strong>Occupation:</strong> {user.occupation}
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>Description:</strong> {user.description}
        </Typography>
        {/* {currentUser && String(currentUser._id) === String(userId) && (
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to={`/users/${userId}/edit`}
            >
              Edit Profile
            </Button>

            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`/photos/${userId}`}
            >
              View Photos
            </Button>
          </Box>
        )} */}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/photos/${user._id}`}
        >
          View Photos
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserDetail;
