const express = require('express');
const { getCategories, getCategoryByID, createCategory, deleteCategory, restoreCategory, editCategory } = require('../controllers/itemCategoryController');
const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryByID);
router.post('/add', createCategory);
router.delete('/delete/:id', deleteCategory);
router.put('/restore/:id', restoreCategory);
router.put('/edit/:id', editCategory);

module.exports = router;