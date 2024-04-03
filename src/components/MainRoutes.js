import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PetList from './PetList';
import AddPet from './AddPet';
import SinglePet from './SinglePet';
import Login from './Login';
import { onRegister, RegisterForm } from './Register';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets" element={<PetList />} />
      <Route path="/addpet" element={<AddPet />} />
      <Route path="/pets/:id" element={<SinglePet />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterForm onRegister={onRegister}/>} />
    </Routes>
  );
}

export default MainRoutes;

