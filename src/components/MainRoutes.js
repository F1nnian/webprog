import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PetList from './PetList';
import AddPet from './AddPet';
import SinglePet from './SinglePet';
import EditPet from './EditPet';
import Login from './Login';
import MyPets from './MyPets';
import { RegisterForm } from './Register';

function MainRoutes({ onRegister, onLogin, isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets" element={<PetList />} />
      <Route path="/addpet" element={<AddPet isLoggedIn={ isLoggedIn }/>} />
      <Route path="/pets/:id" element={<SinglePet />} />
      <Route path="/pets/:id/edit" element={<EditPet />} />
      <Route path="/login" element={<Login onLogin={ onLogin }/>} />
      <Route path="/register" element={<RegisterForm onRegister={ onRegister }/>} />+
      <Route path="/my-pets" element={<MyPets />} />
    </Routes>
  );
}

export default MainRoutes;

