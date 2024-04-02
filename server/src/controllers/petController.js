const multer = require('multer');
const Pet = require('../models/petModel');

async function getAllPets(req, res) {
  try {
    const sortBy = req.query.sortBy || 'createdAt';
    const limit = parseInt(req.query.limit) || 0;

    const pets = await Pet.find()
      .sort({ [sortBy]: -1 })
      .limit(limit)
      .select('name species age image');
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getPetById(req, res) {
  try {
    const pet = await Pet.findById(req.params.id);
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
    uploadSingle(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      } else if (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
      }
      
      const image = req.file.filename;
      console.log(image);
      const { name, species, age } = req.body;

            const newPet = new Pet({
                name,
                species,
                age,
                image
            });

            const savedPet = await newPet.save();

            res.status(201).json(savedPet);
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
  getAllPets,
  getPetById,
  createPet
};
