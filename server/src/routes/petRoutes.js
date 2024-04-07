const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Define the routes for the Pet API

router.get('/pets', petController.getAllPets);

router.get('/my-pets', petController.getMyPets);

router.get('/pets/:id', petController.getPetById);

router.post('/pets', petController.createPet);

router.get('/pets/:id/edit', petController.editPet);

router.put('/pets/:id/update', petController.updatePet);

router.delete('/pets/:id/delete', petController.deletePet);

module.exports = router;
