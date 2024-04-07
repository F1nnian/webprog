import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PetList from './PetList';
import AddPet from './AddPet';
import AddPetNew from './AddPetNew';
import SinglePet from './SinglePet';
import EditPet from './EditPet';
import SignIn from './SignIn';
import MyPets from './MyPets';
import SignUp from './SignUp';
import NewestPetList from './NewestPets';

function MainRoutes({ onRegister, onLogin, isLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pets" element={<PetList />} />
      <Route path="/add-pet" element={<AddPetNew isLoggedIn={ isLoggedIn }/>} />
      <Route path="/pets/:id" element={<SinglePet />} />
      <Route path="/pets/:id/edit" element={<EditPet />} />
      <Route path="/login" element={<SignIn onLogin={ onLogin }/>} />
      <Route path="/signup" element={<SignUp onRegister={ onRegister }/>} />
      <Route path="/my-pets" element={<MyPets />} />
    </Routes>
  );
}

export default MainRoutes;

