import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Gọi API lấy chi tiết user
    fetchModel(`/user/${userId}`)
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
