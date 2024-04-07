import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PetList from './petlists/PetList';
import AddPet from './pets/AddPet';
import SinglePet from './pets/SinglePet';
import EditPet from './pets/EditPet';
import SignIn from './user/SignIn';
import MyPets from './petlists/MyPets';
import SignUp from './user/SignUp';

function MainRoutes({ onRegister, onLogin, isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets" element={<PetList />} />
      <Route path="/add-pet" element={<AddPet isLoggedIn={ isLoggedIn }/>} />
      <Route path="/pets/:id" element={<SinglePet />} />
      <Route path="/pets/:id/edit" element={<EditPet />} />
      <Route path="/login" element={<SignIn onLogin={ onLogin }/>} />
      <Route path="/signup" element={<SignUp onRegister={ onRegister }/>} />
      <Route path="/my-pets" element={<MyPets />} />
    </Routes>
  );
}

export default MainRoutes;

