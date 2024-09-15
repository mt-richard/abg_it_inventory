
const { Item_category } = require('../models');
const { Op } = require('sequelize');
const item_category = require('../models/item_category');


exports.getAllCategory = async () => {
  try {
    return await Item_category.findAll();
  } catch (error) {
    throw new Error(`Error fetching categories: ${error.message}`);
  } 
};

exports.getByName = async (name) => {
  try {
    return await item_category.findOne({ where: { category_name: name } });
  } catch (error) {
    throw new Error(`Error fetching category: ${error.message}`);
  }
};

exports.getCategoryById = async (id) => {
  try {
    return await Item_category.findOne({where: {category_id: id }});
  } catch (error) {
    throw new Error(`Error fetching category: ${error.message}`);
  }
};


exports.createCategory = async (data) => {
  try {
    return await Item_category.create(data);
  } catch (error) {
    throw new Error(`Error cretaing category: ${error.message}`);
  }
};

exports.deleteCategory = async (id) => {
  try {
    let response = await Item_category.findByPk(id);
    if (!response) {
      const error = new Error(`Item Category not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'inactive';
    await response.save();
    return response;
  } catch (error) {
    throw new Error(`Error deleting category: ${error.message}`);
  }
};

exports.restoreCategory = async (id) => {
  try {
    let response = await Item_category.findByPk(id);
    if (!response) {
      const error = new Error(`Item Category not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'active';
    await response.save();
    return response;
  } catch (error) {
    throw new Error(`Error restoring category: ${error.message}`);
  }
};

exports.editCategory = async (id, name, status) => {
  try {
    let categoryData = await Item_category.findByPk(id);
    if (!categoryData) {
      const error = new Error(`Item Category not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    categoryData.name = name;
    categoryData.status = status;
    await categoryData.save();
    return categoryData;
  } catch (error) {
    throw new Error(`Error restoring User : ${error.message}`);
  }
};