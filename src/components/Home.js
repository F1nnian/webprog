import React, { useState, useEffect } from 'react';
import NewestPetList from './NewestPets';

function Home() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
      <h1>Newest Pets</h1>
      <NewestPetList />
    </div>
  );
}

export default Home;
