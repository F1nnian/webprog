import React, { useState, useEffect } from 'react';

function NewestPetList() {
  const [newestPets, setNewestPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/pets?sortBy=date&limit=10')
      .then(response => response.json())
      .then(data => setNewestPets(data))
      .catch(error => console.error('Error fetching newest pets:', error));
  }, []);

  return (
    <div>
      <h2>Newest Pets</h2>
      <ul>
        {newestPets.map(pet => (
          <li key={pet._id}>
            <img src={"http://localhost:5000/images/"+pet.image} alt={pet.name} style={{ width: '100px', height: '100px' }} />
            <div>
              <h3>{pet.name}</h3>
              <p>Age: {pet.age}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Adopt a Pet</h1>
      <NewestPetList />
    </div>
  );
}

export default Home;
