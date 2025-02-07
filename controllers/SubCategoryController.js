const  SubCategoryService = require('../services/sub_category.service');
// const {users} = require('../models');

exports.getSubCategories = async (req, res) => {
    try {
      const response = await SubCategoryService.getAllSubCategory();
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.createSubCategory = async (req, res) => { 
    try {
        const { description, category_id, status } = req.body
        const ifExists = await SubCategoryService.getByName(description)
        if (!ifExists) {
            const response = await SubCategoryService.createSubCategory({ description, category_id, status})
            res.json(response);
        } else {
            res.status(200).json({message : "Sub Category already exists"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getSubCategoryByID = async (req, res) => {
    try {
        const id = req.params.id;
        const response =  await SubCategoryService.getSubCategoryById(id);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

  exports.deleteSubCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const catData = await SubCategoryService.deleteSubCategory(id);
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

  exports.restoreSubCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const catData = await SubCategoryService.restoreSubCategory(id);
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

  exports.editSubCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const { category_id, description, status } = req.body
      const catData = await SubCategoryService.editSubCategory(id, category_id, description, status);
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