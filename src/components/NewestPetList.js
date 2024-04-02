import React, { useState, useEffect } from 'react';

function NewestPetList() {
  const [newestPets, setNewestPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/pets?sortBy=createdAt&limit=10')
      .then(response => response.json())
      .then(data => setNewestPets(data))
      .catch(error => console.error('Error fetching newest pets:', error));
  }, []);

  return (
    <div>
      <h2>Newest Pets</h2>
      <ul>
        {newestPets.map(pet => (
          <li key={pet._id}>{pet.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NewestPetList;
