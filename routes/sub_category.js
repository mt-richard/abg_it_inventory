const express = require('express');
const { getSubCategories, getSubCategoryByID, createSubCategory, deleteSubCategory, restoreSubCategory, editSubCategory } = require('../controllers/SubCategoryController');
const router = express.Router();

router.get('/', getSubCategories);
router.get('/:id', getSubCategoryByID);
router.post('/add', createSubCategory);
router.delete('/delete/:id', deleteSubCategory);
router.put('/restore/:id', restoreSubCategory);
router.put('/edit/:id', editSubCategory);

module.exports = router;