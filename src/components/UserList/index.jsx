import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios"; // Thay fetchModel bằng axios
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Gọi API lấy danh sách user từ Backend thật
    // Lưu ý: withCredentials: true là BẮT BUỘC để gửi session cookie đi
    axios
      .get("https://zld62n-8082.csb.app/user/list", { withCredentials: true })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h5" style={{ padding: "10px" }}>
        Users
      </Typography>
      <Divider />
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem button component={Link} to={`/users/${user._id}`} divider>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
