import React, { useState } from 'react';

function AddPetForm({ onAdd }) {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
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
    formData.append('age', parseInt(age));
    formData.append('image', image);

    onAdd(formData);
    setName('');
    setSpecies('');
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
        <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} />
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

function AddPet() {
  const handleAddPet = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/pets', {
        method: 'POST',
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
      <AddPetForm onAdd={handleAddPet} />
    </div>
  );
}

export default AddPet;
