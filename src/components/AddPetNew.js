import React, { useState } from 'react';
import { Container, Box, Typography, Avatar, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom';

const defaultTheme = createTheme();

function AddPetForm({ onAdd, isLoggedIn }) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !species || !gender || !age || !image) {
      alert('Please fill in all required fields');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('species', species);
    formData.append('gender', gender)
    formData.append('age', parseInt(age));
    formData.append('image', image);

    onAdd(formData);
    setName('');
    setSpecies('');
    setGender('');
    setAge('');
    setImage(null);
    setPreviewImage(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add a New Pet
          </Typography>
          {isLoggedIn ? (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl required fullWidth>
                    <InputLabel>Species</InputLabel>
                    <Select
                      value={species}
                      onChange={(e) => setSpecies(e.target.value)}
                    >
                      <MenuItem value="dog">Dog</MenuItem>
                      <MenuItem value="cat">Cat</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl required fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="unknown">Unknown</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="age"
                    label="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <Button variant="contained" component="span">
                      Select Image
                    </Button>
                  </label>
                  {previewImage && (
                    <img src={previewImage} alt="Selected Pet" style={{ width: '100%', marginTop: '10px' }} />
                  )}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Pet
              </Button>
            </Box>
          ) : (
            <p>Please <Link to="/login">log in</Link> to add a pet</p>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddPetForm;
