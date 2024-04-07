import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddPetForm({ onAdd }) {
  console.log(onAdd)
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !species || !age || !image) {
      alert('Please fill in all fields');
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Pet</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Species:
        <select onChange={(e) => setSpecies(e.target.value)}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
      </label>
      <label>
        Gender:
        <select onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <label>
        Image:
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <button type="submit">Add Pet</button>
    </form>
  );
}

function AddPet({ isLoggedIn }) {
  const handleAddPet = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/pets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        console.log('Pet added successfully!');
      } else {
        console.error('Failed to add pet:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding pet:', error.message);
    }
  };

  return (
    <div>
      {(isLoggedIn) ? <AddPetForm onAdd={handleAddPet} /> : (<p>Please <Link to="/login">log in</Link> to add a pet</p>)}
    </div>
  );
}

export default AddPet;
