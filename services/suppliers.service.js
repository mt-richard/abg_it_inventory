
const { suppliers } = require('../models');
const { Op } = require('sequelize');


exports.getAllSuppliers = async () => {
  try {
    return await suppliers.findAll();
  } catch (error) {
    throw new Error(`Error fetching suppliers: ${error.message}`);
  } 
};

exports.getByName = async (name) => {
  try {
    return await suppliers.findOne({ where: { sup_name: name } });
  } catch (error) {
    throw new Error(`Error fetching suppliers: ${error.message}`);
  }
};

exports.getSupplierById = async (id) => {
  try {
    return await suppliers.findOne({where: {sup_id: id }});
  } catch (error) {
    throw new Error(`Error fetching suppliers: ${error.message}`);
  }
};


exports.createSupplier = async (data) => {
  try {
    return await suppliers.create(data);
  } catch (error) {
    throw new Error(`Error cretaing supplier: ${error.message}`);
  }
};

exports.deleteSupplier = async (id) => {
  try {
    let response = await suppliers.findByPk(id);
    if (!response) {
      const error = new Error(` supplier not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'inactive';
    await response.save();
    return response;
  } catch (error) {
    throw new Error(`Error deleting supplier: ${error.message}`);
  }
};

exports.restoreSupplier = async (id) => {
  try {
    let response = await suppliers.findByPk(id);
    if (!response) {
      const error = new Error(` supplier not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'active';
    await response.save();
    return response;
  } catch (error) {
    throw new Error(`Error restoring suppliers: ${error.message}`);
  }
};

exports.editSupplier = async (id, name, contact, status) => {
  try {
    let supplierData = await suppliers.findByPk(id);
    if (!supplierData) {
      const error = new Error(` supplier not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    supplierData.sup_name = name;
    supplierData.contact = contact;
    supplierData.status = status;
    await supplierData.save();
    return supplierData;
  } catch (error) {
    throw new Error(`Error restoring User : ${error.message}`);
  }
};