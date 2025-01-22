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
    const { item_id, quantity, adjust_type, reason_id, adjusted_at, adjusted_by, status } = req.body;
    const response = await StockAdjustmentService.createStockAdjustment({
      item_id,
      quantity,
      adjust_type,
      reason_id,
      adjusted_at,
      adjusted_by,
      status,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// exports.getMovementById = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const response =  await StockAdjustmentService.getSupplierById(id);
//         res.json(response);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

//   exports.deleteMovement = async (req, res) => {
//     try {
//       const id = req.params.id;
//       const supData = await StockAdjustmentService.deleteMovement(id);
//       res.status(200).json(supData);
//     } catch (error) {
//       if (error.statusCode) {
//         res.status(error.statusCode).json({
//           status: error.statusCode,
//           error: error.message,

//         });
//       } else {
//         res.status(500).json({ message: error.message });
//       }
//     }
//   };

//   exports.restoreMovement = async (req, res) => {
//     try {
//       const id = req.params.id;
//       const supData = await StockAdjustmentService.restoreMovement(id);
//       res.status(200).json(supData);
//     } catch (error) {
//       if (error.statusCode) {
//         res.status(error.statusCode).json({
//           status: error.statusCode,
//           error: error.message,

//         });
//       } else {
//         res.status(500).json({ message: error.message });
//       }
//     }
//   };

//   exports.editMovement = async (req, res) => {
//     try {
//       const id = req.params.id;
//       const { sup_name, contact, status } = req.body
//       const supData = await StockAdjustmentService.editMovement(id, sup_name, contact, status);
//       res.status(200).json(supData);
//     } catch (error) {
//       if (error.statusCode) {
//         res.status(error.statusCode).json({
//           status: error.statusCode,
//           error: error.message,

//         });
//       } else {
//         res.status(500).json({ message: error.message });
//       }
//     }
//   };
