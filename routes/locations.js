const express = require('express');
const { getLocations, getLocationByID, createLocation, deleteLocation, restoreLocation, editLocation } = require('../controllers/locationController');
const router = express.Router();

router.get('/', getLocations);
router.get('/:id', getLocationByID);
router.post('/add', createLocation);
router.delete('/delete/:id', deleteLocation);
router.put('/restore/:id', restoreLocation);
router.put('/edit/:id', editLocation);

module.exports = router;