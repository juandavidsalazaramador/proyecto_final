const express = require('express');
const router = express.Router();
const { getCrops, createCrop } = require('../controllers/crop.controller.js');

// Rutas para los cultivos
router.get('/', getCrops);
router.post('/', createCrop);

module.exports = router;