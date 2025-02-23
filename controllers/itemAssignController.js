const itemAssignService = require('../services/item_assign.service');

exports.getAllAssignments = async (req, res) => {
  try {
    const data = await itemAssignService.getAllAssignments();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await itemAssignService.getAssignmentById(id);
    if (!data) {
      return res.status(404).json({ message: 'Item assignment not found' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssignmentsByItemId = async (req, res) => {
  try {
    const { itemId } = req.params;
    const data = await itemAssignService.getAssignmentsByItemId(itemId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createItemAssign = async (req, res) => {
  try {
    const data = req.body;
    const result = await itemAssignService.createItemAssign(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};