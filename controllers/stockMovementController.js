const StockMovementService = require('../services/stock_movement.service');

exports.getItemsMovements = async (req, res) => {
  try {
    const items = await StockMovementService.getAllItemsMovement();
    res.json(items); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createStockMovement = async (req, res) => { 
    try {
        const { item_id, quantity, movement_type, source_location, destination_location, assigned_user, movement_date, remark, status } = req.body
        const response = await StockMovementService.createItemsMovement({ item_id, quantity, movement_type, source_location, destination_location, assigned_user, movement_date, remark, status})
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getMovementById = async (req, res) => {
    try {
        const id = req.params.id;
        const response =  await StockMovementService.getSupplierById(id);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

  exports.deleteMovement = async (req, res) => {
    try {
      const id = req.params.id;
      const supData = await StockMovementService.deleteMovement(id);
      res.status(200).json(supData);
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

  exports.restoreMovement = async (req, res) => {
    try {
      const id = req.params.id;
      const supData = await StockMovementService.restoreMovement(id);
      res.status(200).json(supData);
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

  exports.editMovement = async (req, res) => {
    try {
      const id = req.params.id;
      const { sup_name, contact, status } = req.body
      const supData = await StockMovementService.editMovement(id, sup_name, contact, status);
      res.status(200).json(supData);
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