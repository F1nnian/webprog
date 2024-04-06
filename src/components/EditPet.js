import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        species: '',
        age: '',
        image: null
    });
    const [updateMessage, setUpdateMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

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
            age: data.age,
            image: `http://localhost:5000/images/${data.image}`
            });
        })
        .catch(error => {
            console.error('Error fetching pet:', error.message);
        });
        } else {
        console.error('No token available');
        }
    }, [id]);

    const handleChange = e => {
        if (e.target.type === 'file') {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        });
        } else {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formDataToSend = new FormData();

        formDataToSend.append('name', formData.name);
        formDataToSend.append('species', formData.species);
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
        <div>
        {(!pet) ? (
            <p>Loading...</p>
        ) : (
            <>
            <h2>Edit Pet</h2>
            {updateMessage && <p>{updateMessage}</p>}
            {deleteMessage && <p>{deleteMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                Species:
                <input type="text" name="species" value={formData.species} onChange={handleChange} />
                </label>
                <label>
                Age:
                <input type="number" name="age" value={formData.age} onChange={handleChange} />
                </label>
                <label>
                Image:
                <input type="file" name="image" onChange={handleChange} />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={handleDelete}>Delete</button>
            </form>
            </>
        )}
        </div>
    );
}

export default EditPet;