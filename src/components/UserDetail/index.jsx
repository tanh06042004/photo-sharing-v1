import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import models from '../../modelData/models';
import './styles.css';

function UserDetail() {
  // Lấy userId từ URL parameters
  const { userId } = useParams();
  
  // Lấy thông tin user từ model
  const user = models.userModel(userId);

  if (!user) {
    return <Typography variant="h5">User not found</Typography>;
  }

  return (
    <Card style={{ margin: '20px' }}>
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