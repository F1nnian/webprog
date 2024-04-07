const multer = require('multer');
const Pet = require('../models/petModel');
const jwt = require('jsonwebtoken');

async function getAllPets(req, res) {
  try {
    const sortBy = req.query.sortBy || 'createdAt';
    const limit = parseInt(req.query.limit) || 0;

    const pets = await Pet.find()
      .sort({ [sortBy]: -1 })
      .limit(limit)
      .select('name species gender age image');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getMyPets(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'testtest123');
    const userId = decodedToken.userId;

    const pets = await Pet.find({ createdBy: userId }).select('name species gender age image');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getPetById(req, res) {
  try {
    const pet = await Pet.findById(req.params.id).populate('createdBy', 'firstName lastName email');
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/resource/images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage: storage });

const uploadSingle = upload.single('image');

async function createPet(req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'testtest123');
    const userId = decodedToken.userId;

    uploadSingle(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      const image = req.file.filename;
      const { name, species, gender, age } = req.body;

            const newPet = new Pet({
                name,
                species,
                age,
                gender,
                image,
                createdBy: userId
            });

            const savedPet = await newPet.save();

            res.status(201).json(savedPet);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function editPet(req, res) {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'testtest123');
    const userId = decodedToken.userId;


    if (pet.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Access forbidden' });
    }
    res.json(pet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updatePet(req, res) {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'testtest123');
    const userId = decodedToken.userId;

    if (pet.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Access forbidden' });
    }

    uploadSingle(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      const { name, species, age } = req.body;
      const image = req.file ? req.file.filename : pet.image;

      pet.name = name;
      pet.species = species;
      pet.age = age;
      pet.image = image;

      const updatedPet = await pet.save();
      res.json(updatedPet);
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deletePet(req, res) {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'testtest123');
    const userId = decodedToken.userId;

    if (pet.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Access forbidden' });
    }

    await pet.deleteOne();
    res.json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getAllPets,
  getMyPets,
  getPetById,
  createPet,
  editPet,
  updatePet,
  deletePet
};
