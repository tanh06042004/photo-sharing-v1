import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Divider,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  // State lưu nội dung comment đang nhập: { photo_id: "nội dung comment" }
  const [commentInputs, setCommentInputs] = useState({});
  // State quản lý việc sửa comment
  // const [editingComment, setEditingComment] = useState({
  //   photoId: null,
  //   commentId: null,
  //   text: "",
  // });

  useEffect(() => {
    axios
      .get(`https://zld62n-8082.csb.app/user/${userId}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [userId]);

  // Hàm load ảnh (tách ra để gọi lại sau khi comment xong)
  const fetchPhotos = () => {
    axios
      .get(`https://zld62n-8082.csb.app/photosOfUser/${userId}`)
      .then((res) => setPhotos(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchPhotos();
  }, [userId]);

  // Xử lý khi nhập comment
  const handleCommentChange = (photoId, value) => {
    setCommentInputs({ ...commentInputs, [photoId]: value });
  };

  // Xử lý khi bấm nút Gửi comment
  const handleSubmitComment = async (photoId) => {
    const comment = commentInputs[photoId];
    if (!comment) return;

    try {
      await axios.post(
        `https://zld62n-8082.csb.app/commentsOfPhoto/${photoId}`,
        { comment: comment }
      );
      // Gửi xong thì xóa ô input và load lại ảnh để hiện comment mới
      setCommentInputs({ ...commentInputs, [photoId]: "" });
      fetchPhotos();
    } catch (err) {
      console.error("Error posting comment:", err);
      alert("Failed to post comment");
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Photos of {user ? `${user.first_name} ${user.last_name}` : "..."}
      </Typography>

      <Grid container spacing={3}>
        {photos.map((photo) => (
          <Grid item xs={12} key={photo._id}>
            <Card variant="outlined">
              <CardHeader title={new Date(photo.date_time).toLocaleString()} />
              <CardMedia
                component="img"
                image={`https://zld62n-8082.csb.app/images/${photo.file_name}`}
                alt="User Photo"
                style={{
                  objectFit: "contain",
                  maxHeight: "500px",
                  backgroundColor: "#f0f0f0",
                }}
              />
              <CardContent>
                <Typography variant="h6">Comments:</Typography>
                <List dense>
                  {photo.comments &&
                    photo.comments.map((c) => (
                      <ListItem key={c._id || Math.random()}>
                        <ListItemText
                          primary={
                            <span>
                              <Link
                                to={`/users/${c.user_id}`}
                                style={{
                                  fontWeight: "bold",
                                  textDecoration: "none",
                                }}
                              >
                                {c.user_id}
                                {/* Nếu muốn hiện tên thay vì ID, cần gọi API lấy tên user hoặc lưu tên vào comment */}
                              </Link>
                              : {c.comment}
                            </span>
                          }
                          secondary={new Date(c.date_time).toLocaleString()}
                        />
                      </ListItem>
                    ))}
                </List>

                <Divider style={{ margin: "10px 0" }} />

                {/* Ô nhập comment */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <TextField
                    label="Add a comment"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={commentInputs[photo._id] || ""}
                    onChange={(e) =>
                      handleCommentChange(photo._id, e.target.value)
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubmitComment(photo._id)}
                  >
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default UserPhotos;
