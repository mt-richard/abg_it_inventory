const StockAdjustmentService = require("../services/stock_adjustment.service");

exports.getStockAdjustments = async (req, res) => {
  try {
    const items = await StockAdjustmentService.getAllAdjustedRecords();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStockAdjustment = async (req, res) => { 
  try {
    const { item_id, quantity, adjustment_type, location,division,employee, reason_id, comment, adjusted_at, adjusted_by, status } = req.body;
    const response = await StockAdjustmentService.createStockAdjustment({
      item_id,
      quantity, 
      adjustment_type,
      location,
      division,
      employee,
      reason_id,
      comment,
      adjusted_at,
      adjusted_by,
      status,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
