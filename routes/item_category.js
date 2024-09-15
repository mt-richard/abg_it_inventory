const express = require('express');
const router = express.Router();

router.get('/', getItemCategory);
router.get('/:id', getItemCategoryByID);
router.post('/add', createItemCategory);
router.delete('/delete/:id', deleteItemCategory);
router.put('/restore/:id', restoreItemCategory);
router.put('/edit/:id', editItemCategory);

module.exports = router;