
const { adjustment_reasons } = require('../models');
const { Op } = require('sequelize');

exports.getAllAdjustment_reason = async () => {
  try {
    return await adjustment_reasons.findAll();
  } catch (error) {
    throw new Error(`Error fetching adjustment reason: ${error.message}`);
  } 
};


exports.getReasonById = async (id) => {
  try {
    return await adjustment_reasons.findOne({where: {reason_id: id }});
  } catch (error) {
    throw new Error(`Error fetching adjustment reason: ${error.message}`);
  }
};

exports.getByName = async (name) => {
  try {
    return await adjustment_reasons.findOne({ where: { reason: name } });
  } catch (error) {
    throw new Error(`Error fetching adjustment reason: ${error.message}`);
  }
};


exports.createReason = async (data) => {
  try {
    const response =  await adjustment_reasons.create(data);
    return { message: "Adjust reason added successfull", reason: response };
  } catch (error) {
    throw new Error(`Error cretaing supplier: ${error.message}`);
  }
};

exports.deleteReason = async (id) => {
  try {
    let response = await adjustment_reasons.findByPk(id);
    if (!response) {
      const error = new Error(` supplier not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'inactive';
    await response.save();
    return { message: "Supplier deleted successfull", reason: response };
  } catch (error) {
    throw new Error(`Error deleting supplier: ${error.message}`);
  }
};

exports.restoreReason = async (id) => {
  try {
    let response = await adjustment_reasons.findByPk(id);
    if (!response) {
      const error = new Error(` adjust reason not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'active';
    await response.save();
    return { message: "Supplier restored successfull", reason: response };
  } catch (error) {
    throw new Error(`Error restoring adjustment_reason: ${error.message}`);
  }
};

exports.editReason = async (id, reason, description, status) => {
  try {
    let reasonData = await adjustment_reasons.findByPk(id);
    if (!reasonData) {
      const error = new Error(` adjust reason not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    reasonData.reason = reason;
    reasonData.description = description;
    reasonData.status = status;
    await reasonData.save();
    return { message: "adjust reason updated successfull", reason: reasonData };
  } catch (error) {
    throw new Error(`Error restoring User : ${error.message}`);
  }
};

exports.deleteReason = async ( id) => {
  try {
    let response = await adjustment_reasons.findByPk(id);
    if (!response) {
      const error = new Error(`adjust reason not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'inactive';
    await response.save();
    return { message: "adjust reason deleted successfull", reason: response };
  } catch (error) {
    throw new Error(`Error deleting adjust reason: ${error.message}`);
  }
}


exports.restoreReason = async (id) => {
  try {
    let response = await adjustment_reasons.findByPk(id);
    if (!response) {
      const error = new Error(`adjust reason not found with id: ${id}`);
      error.statusCode = 404;
      throw error;
    }
    response.status = 'active';
    await response.save();
    return { message: "adjust reason restored successfull", reason: response };
  } catch (error) {
    throw new Error(`Error restoring adjust reason: ${error.message}`);
  }
}