const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.get('/pets', petController.getAllPets);

router.get('/pets/:id', petController.getPetById);

router.post('/pets', petController.createPet);

module.exports = router;
