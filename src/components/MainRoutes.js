import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PetList from './PetList';
import AddPet from './AddPet';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets" element={<PetList />} />
      <Route path="/addpet" element={<AddPet />} />
    </Routes>
  );
}

export default MainRoutes;
