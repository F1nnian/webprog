import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function EditPet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        species: '',
        gender: '',
        age: '',
        image: null
    });
    const [updateMessage, setUpdateMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (token) {
            fetch(`http://localhost:5000/api/pets/${id}/edit`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 403) {
                    throw new Error('Access forbidden');
                } else {
                    throw new Error('Failed to fetch pet');
                }
            })
            .then(data => {
                setPet(data);
                setFormData({
                    name: data.name,
                    species: data.species,
                    gender: data.gender,
                    age: data.age,
                    image: `http://localhost:5000/images/${data.image}`
                });
                setPreviewImage(`http://localhost:5000/images/${data.image}`);
            })
            .catch(error => {
                console.error('Error fetching pet:', error.message);
            });
        } else {
            console.error('No token available');
        }
    }, [id]);
    

    const handleChange = e => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prevFormData => ({
                ...prevFormData,
                image: files[0]
            }));
            setPreviewImage(URL.createObjectURL(files[0]));
        } else if (name === 'age') {
            const ageValue = parseInt(value);
            if (ageValue >= 0 && ageValue <= 25) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    age: ageValue
                }));
            } else {
                alert('Age must be between 0 and 25');
            }
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };
       
    

    const handleSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();

        formDataToSend.append('name', formData.name);
        formDataToSend.append('species', formData.species);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('age', formData.age);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        if (token) {
            try {
                const response = await fetch(`http://localhost:5000/api/pets/${id}/update`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formDataToSend
                });

                if (response.ok) {
                    setUpdateMessage('Pet updated successfully!');
                } else {
                    setUpdateMessage(`Failed to update pet: ${response.statusText}`);
                }
            } catch (error) {
                setUpdateMessage(`Error updating pet: ${error.message}`);
            }
        } else {
            setUpdateMessage('No token available');
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const response = await fetch(`http://localhost:5000/api/pets/${id}/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setDeleteMessage('Pet deleted successfully!');
                    navigate(-1)
                } else {
                    setDeleteMessage(`Failed to delete pet: ${response.statusText}`);
                }
            } catch (error) {
                setDeleteMessage(`Error deleting pet: ${error.message}`);
            }
        } else {
            setDeleteMessage('No token available');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 2 }}>
            {!pet ? (
                <Typography variant="body1">Loading...</Typography>
            ) : (
                <>
                    <Typography variant="h4" mb={2}>Edit Pet</Typography>
                    {updateMessage && <Typography variant="body1" color="primary">{updateMessage}</Typography>}
                    {deleteMessage && <Typography variant="body1" color="error">{deleteMessage}</Typography>}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Species</InputLabel>
                                    <Select
                                        value={formData.species}
                                        onChange={handleChange}
                                        name="species"
                                    >
                                        <MenuItem value="dog">Dog</MenuItem>
                                        <MenuItem value="cat">Cat</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={formData.gender}
                                        onChange={handleChange}
                                        name="gender"
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="unknown">Unknown</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    type="number"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    accept="image/*"
                                    id="image-input"
                                    type="file"
                                    name="image"
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
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
                            <Grid item xs={12} container justifyContent="space-between">
                                <Button type="submit" variant="contained" color="primary">
                                    Update
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </>
            )}
        </Box>
    );
}

export default EditPet;
