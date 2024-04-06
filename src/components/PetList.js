import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PetList() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/pets')
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(setPets([]));
  }, []);
  
  return (
    <ul>
      {!pets ? (
        <p>No Pets found or not logged in</p>
      ) : (
        pets.map(pet => (
          <li key={pet._id}>
            <Link to={`/pets/${pet._id}`}>
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
