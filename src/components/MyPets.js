import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  
    fetch('http://localhost:5000/api/my-pets', {
      headers,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Not logged in');
        }
        return response.json();    
      })
      .then(data => setPets(data))
      .catch(error => console.error('Error fetching pets:', error));
  }, []);
  
  return (
    <ul>
      {pets.length === 0 ? (
        <p>No Pets found or not logged in. <Link to="/addpet">Add Pet</Link></p>
      ) : (
        pets.map(pet => (
          <li key={pet._id}>
            <Link to={`/pets/${pet._id}/edit`}>
              <img src={"http://localhost:5000/images/"+pet.image} alt={pet.name} style={{ width: '100px', height: '100px' }} />
              <div>
                <h3>{pet.name}</h3>
                <p>Age: {pet.age}</p>
              </div>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
}

export default PetList;