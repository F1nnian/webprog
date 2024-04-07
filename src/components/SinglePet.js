import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Avatar, Divider } from '@mui/material';

function SinglePet() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/pets/${id}`)
      .then(response => response.json())
      .then(data => setPet(data))
      .catch(error => console.error('Error fetching pet:', error));
  }, [id]);

  if (!pet) {
    return <CircularProgress />;
  }

  return (
    <Box textAlign="center">
      <Typography variant="h4">{pet.name}</Typography>
      <Typography variant="body1">Species: {pet.species}</Typography>
      <Typography variant="body1">Age: {pet.age}</Typography>
      <Avatar alt={pet.name} src={`http://localhost:5000/images/${pet.image}`} sx={{ width: 100, height: 100, margin: 'auto' }} />
      <Divider style={{ margin: '20px auto', width: '50%' }} />
      <Typography variant="body1">Current Owner: {pet.createdBy.firstName} {pet.createdBy.lastName}</Typography>
      <Typography variant="body1">E-Mail-Adress: {pet.createdBy.email}</Typography>
    </Box>
  );
}

export default SinglePet;
