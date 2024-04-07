import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


// This component displays a list of all pets.
function PetList() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  // fetch the pets from the server
  useEffect(() => {
    fetch('http://localhost:5000/api/pets')
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(() => setPets([]));
  }, []);

  // display the list of pets
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
      <h1>Pets</h1>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {!pets || pets.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No Pets found or not logged in
          </Typography>
        ) : (
          pets.map(pet => (
            <React.Fragment key={pet._id}>
              <ListItem onClick={() => navigate(`/pets/${pet._id}`)} alignItems="flex-start" style={{ textDecoration: 'none', cursor: 'pointer' }}>
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
