import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{pet.name}</h2>
      <p>Species: {pet.species}</p>
      <p>Age: {pet.age}</p>
      <img src={`http://localhost:5000/images/${pet.image}`} alt={pet.name} style={{ width: '100px', height: '100px' }} />
      <p>Current Owner: {pet.createdBy.firstName} {pet.createdBy.lastName}</p>
      <p>E-Mail-Adress: {pet.createdBy.email}</p>
    </div>
  );
}

export default SinglePet;
