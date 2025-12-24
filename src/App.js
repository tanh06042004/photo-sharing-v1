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
import EditProfile from "./components/EditProfile"; // Đừng quên import dòng này

const App = (props) => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar user={user} setUser={setUser} />
          </Grid>
          <div className="main-topbar-buffer" />

          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {user ? <UserList /> : <div />}
            </Paper>
          </Grid>

          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                {/* -------------------------------------------------- */}
                {/* KHỐI 1   */}
                {/* Dùng user && (...) Nếu có user thì render cái này */}
                {user && (
                  <>
                    <Route path="/users" element={<UserList />} />
                    {/* Redirect mặc định */}
                    <Route
                      path="/"
                      element={<Navigate to={`/users/${user._id}`} />}
                    />
                  </>
                )}

                {/* -------------------------------------------------- */}
                {/* KHỐI 2: Các route (Detail, Edit, Photos) */}
                {user && (
                  <>
                    {/* Truyền currentUser vào các component này */}
                    <Route
                      path="/users/:userId"
                      element={<UserDetail currentUser={user} />}
                    />
                    <Route
                      path="/users/:userId/edit"
                      element={<EditProfile currentUser={user} />}
                    />
                    <Route
                      path="/photos/:userId"
                      element={<UserPhotos currentUser={user} />}
                    />
                  </>
                )}

                {/* -------------------------------------------------- */}
                {/* KHỐI 3: Xử lý khi CHƯA đăng nhập (LoginRegister)   */}
                {/* Chỉ hiện khi !user (không có user) */}
                {!user && (
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
