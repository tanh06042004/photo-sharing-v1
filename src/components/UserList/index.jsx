import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

function UserList() {
  // Lấy danh sách tất cả users
  const users = models.userListModel();

  return (
    <div>
      <Typography variant="h5" style={{ padding: '10px' }}>
        Users
      </Typography>
      <List component="nav">
        {users.map((user) => (
          <ListItem 
            button 
            component={Link} 
            to={`/users/${user._id}`}
            key={user._id}
          >
            <ListItemText 
              primary={`${user.first_name} ${user.last_name}`} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;