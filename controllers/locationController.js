const  LocationService = require('../services/locations.service');

exports.getLocations = async (req, res) => {
    try {
      const response = await LocationService.getAllLocations();
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.createLocation = async (req, res) => { 
    try {
        const { location_name, status } = req.body
        const ifExists = await LocationService.getByName(location_name)
        if (!ifExists) {
            const response = await LocationService.createLocation({ location_name, status})
            res.json(response);
        } else {
            res.status(200).json({message : "location already exists"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getLocationByID = async (req, res) => {
    try {
        const id = req.params.id;
        const response =  await LocationService.getLocationById(id);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

  exports.deleteLocation = async (req, res) => {
    try {
      const id = req.params.id;
      const catData = await LocationService.deleteLocation(id);
      res.status(200).json(catData);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          status: error.statusCode,
          error: error.message,
          
        });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  exports.restoreLocation = async (req, res) => {
    try {
      const id = req.params.id;
      const catData = await LocationService.restoreLocation(id);
      res.status(200).json(catData);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          status: error.statusCode,
          error: error.message,
          
        });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  exports.editLocation = async (req, res) => {
    try {
      const id = req.params.id;
      const { location_name, status } = req.body
      const catData = await LocationService.editLocation(id, location_name, status);
      res.status(200).json(catData);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          status: error.statusCode,
          error: error.message,
          
        });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };