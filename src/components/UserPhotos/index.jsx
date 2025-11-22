import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

// Giữ nguyên phần import ảnh cứng này vì DB chỉ lưu tên file
import malcolm1Img from "../../images/malcolm1.jpg";
import malcolm2Img from "../../images/malcolm2.jpg";
import ousterImg from "../../images/ouster.jpg";
import kenobi1Img from "../../images/kenobi1.jpg";
import kenobi2Img from "../../images/kenobi2.jpg";
import kenobi3Img from "../../images/kenobi3.jpg";
import kenobi4Img from "../../images/kenobi4.jpg";
import ludgate1Img from "../../images/ludgate1.jpg";
import ripley1Img from "../../images/ripley1.jpg";
import ripley2Img from "../../images/ripley2.jpg";
import took1Img from "../../images/took1.jpg";
import took2Img from "../../images/took2.jpg";

const photoSources = {
  "malcolm1.jpg": malcolm1Img,
  "malcolm2.jpg": malcolm2Img,
  "ouster.jpg": ousterImg,
  "kenobi1.jpg": kenobi1Img,
  "kenobi2.jpg": kenobi2Img,
  "kenobi3.jpg": kenobi3Img,
  "kenobi4.jpg": kenobi4Img,
  "ludgate1.jpg": ludgate1Img,
  "ripley1.jpg": ripley1Img,
  "ripley2.jpg": ripley2Img,
  "took1.jpg": took1Img,
  "took2.jpg": took2Img,
};

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Lấy danh sách ảnh
    fetchModel(`/photosOfUser/${userId}`)
      .then((response) => {
        setPhotos(response.data);
      })
      .catch((error) => console.error("Error fetching photos:", error));

    // 2. Lấy thông tin user để hiện tên trên đầu trang
    fetchModel(`/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) =>
        console.error("Error fetching user for header:", error)
      );
  }, [userId]);

  // Hàm format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user)
    return (
      <Typography variant="h6" style={{ padding: "20px" }}>
        Loading user...
      </Typography>
    );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {`Photos of ${user.first_name} ${user.last_name}`}
      </Typography>

      {photos.length === 0 && (
        <Typography variant="body1">No photos found.</Typography>
      )}

      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: "30px" }}>
          <CardMedia
            component="img"
            // Fallback nếu ảnh không có trong map thì hiện khung trống
            image={photoSources[photo.file_name] || ""}
            alt={photo.file_name}
            style={{ maxWidth: "100%", height: "auto" }}
          />

          <CardContent>
            <Typography variant="caption" color="textSecondary">
              {`Posted on ${formatDate(photo.date_time)}`}
            </Typography>

            {photo.comments && photo.comments.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h6" gutterBottom>
                  {`Comments (${photo.comments.length})`}
                </Typography>
                <Divider />

                {photo.comments.map((comment) => (
                  <div key={comment._id} style={{ marginTop: "15px" }}>
                    <Typography variant="body2">
                      <Link
                        to={`/users/${comment.user._id}`}
                        style={{ textDecoration: "none", fontWeight: "bold" }}
                      >
                        {`${comment.user.first_name} ${comment.user.last_name}`}
                      </Link>
                      {" - "}
                      <span style={{ color: "#666", fontSize: "0.9em" }}>
                        {formatDate(comment.date_time)}
                      </span>
                    </Typography>

                    <Typography variant="body1" style={{ marginTop: "5px" }}>
                      {comment.comment}
                    </Typography>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
