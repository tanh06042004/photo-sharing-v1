import "./App.css";
import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import LoginRegister from "./components/LoginRegister";

const App = (props) => {
  // State lưu thông tin user đăng nhập. Ban đầu là null (chưa login)
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Truyền user và setUser xuống TopBar để hiển thị tên và nút Logout */}
            <TopBar user={user} setUser={setUser} />
          </Grid>
          <div className="main-topbar-buffer" />

          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {/* Nếu có user thì hiện danh sách, không thì thôi */}
              {user ? <UserList /> : <div />}
            </Paper>
          </Grid>

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                {/* Nếu đã đăng nhập (user tồn tại) thì cho phép truy cập các route */}
                {user ? (
                  <>
                    <Route path="/users/:userId" element={<UserDetail />} />
                    <Route path="/photos/:userId" element={<UserPhotos />} />
                    <Route path="/users" element={<UserList />} />
                    {/* Mặc định vào trang chi tiết của chính user đó */}
                    <Route
                      path="/"
                      element={<Navigate to={`/users/${user._id}`} />}
                    />
                  </>
                ) : (
                  /* Nếu chưa đăng nhập, mọi đường dẫn đều hiển thị LoginRegister */
                  <Route
                    path="*"
                    element={<LoginRegister onLogin={setUser} />}
                  />
                )}
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
