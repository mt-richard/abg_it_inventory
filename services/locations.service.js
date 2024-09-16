
const { locations } = require('../models');
const { Op } = require('sequelize');


exports.getAllLocations = async () => {
  try {
    return await locations.findAll();
  } catch (error) {
    throw new Error(`Error fetching locations: ${error.message}`);
  } 
};

exports.getByName = async (name) => {
  try {
    return await locations.findOne({ where: { location_name: name } });
  } catch (error) {
    throw new Error(`Error fetching Location: ${error.message}`);
  }
};

exports.getLocationById = async (id) => {
  try {
    return await locations.findOne({where: {location_id: id }});
  } catch (error) {
    throw new Error(`Error fetching Location: ${error.message}`);
  }
};


exports.createLocation = async (data) => {
  try {
    return await locations.create(data);
  } catch (error) {
    throw new Error(`Error cretaing Location: ${error.message}`);
  }
};

exports.deleteLocation = async (id) => {
  try {
    let response = await locations.findByPk(id);
    if (!response) {
      const error = new Error(` Location not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'inactive';
    await response.save();
    return response;
  } catch (error) {
    throw new Error(`Error deleting Location: ${error.message}`);
  }
};

exports.restoreLocation = async (id) => {
  try {
    let response = await locations.findByPk(id);
    if (!response) {
      const error = new Error(` Location not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'active';
    await response.save();
    return response;
  } catch (error) {
    throw new Error(`Error restoring Location: ${error.message}`);
  }
};

exports.editLocation = async (id, name, status) => {
  try {
    let LocationData = await locations.findByPk(id);
    if (!LocationData) {
      const error = new Error(` Location not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    LocationData.location_name = name;
    LocationData.status = status;
    await LocationData.save();
    return LocationData;
  } catch (error) {
    throw new Error(`Error restoring User : ${error.message}`);
  }
};