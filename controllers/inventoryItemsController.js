const InvItemsService = require('../services/inventory_items.service');

// Controller function remains the same
exports.getItemsInStock = async (req, res) => {
  try {
    const items = await InvItemsService.getAllItemsInStock();
    res.json(items); // Send the fetched items directly
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createStockItems = async (req, res) => { 
    try {
        const { item_name, item_category, description, quantity, unit, supplier_id, location, status } = req.body
        const ifExists = await InvItemsService.getByName(item_name)
        if (!ifExists) {
            const response = await InvItemsService.createItems({ item_name, item_category, description, quantity, unit, supplier_id, location, status})
            res.json(response);
        } else {
            res.status(200).json({message : "Item already exists"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const response =  await InvItemsService.getSupplierById(id);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

  exports.deleteSupplier = async (req, res) => {
    try {
      const id = req.params.id;
      const supData = await InvItemsService.deleteSupplier(id);
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

  exports.restoreSupplier = async (req, res) => {
    try {
      const id = req.params.id;
      const supData = await InvItemsService.restoreSupplier(id);
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

  exports.editSupplier = async (req, res) => {
    try {
      const id = req.params.id;
      const { sup_name, contact, status } = req.body
      const supData = await InvItemsService.editSupplier(id, sup_name, contact, status);
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