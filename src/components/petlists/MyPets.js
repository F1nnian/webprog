import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Divider } from '@mui/material';


// This component displays a list of pets that belong to the currently logged in user.
function PetList() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  // fetch the pets from the server
  useEffect(() => {
    fetch('http://localhost:5000/api/my-pets', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Not logged in');
        }
        return response.json();    
      })
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);

  // display the list of pets
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h1>My Pets</h1>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {pets.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No Pets found or not logged in. <Link to="/addpet">Add Pet</Link>
          </Typography>
        ) : (
          pets.map(pet => (
            <React.Fragment key={pet._id}>
              <ListItem onClick={() => navigate(`/pets/${pet._id}/edit`)} alignItems="flex-start" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <ListItemAvatar>
                  <Avatar alt={pet.name} src={`http://localhost:5000/images/${pet.image}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      {pet.name}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Age: {pet.age}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))
        )}
      </List>
    </div>
  );
}

export default PetList;
