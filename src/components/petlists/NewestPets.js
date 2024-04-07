import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This component displays a list of the 10 newest pets.
function NewestPetList() {
    const navigate = useNavigate();
    const [newestPets, setNewestPets] = useState([]);

    // fetch the 10 newest pets from the server
    useEffect(() => {
        fetch('http://localhost:5000/api/pets?sortBy=createdAt&limit=10')
        .then(response => response.json())
        .then(data => setNewestPets(data))
        .catch(error => console.error('Error fetching newest pets:', error));
    }, []);

    const handleItemClick = (petId) => {
        navigate(`/pets/${petId}`);
      };
    
    // display the list of pets
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {newestPets.map((pet) => (
            <React.Fragment key={pet._id}>
              <ListItem
                onClick={() => handleItemClick(pet._id)}
                alignItems="flex-start"
                style={{ cursor: 'pointer' }}
              >
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
                        Age: {pet.age}, Gender: {pet.gender}, Species: {pet.species}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      );
}

export default NewestPetList;
