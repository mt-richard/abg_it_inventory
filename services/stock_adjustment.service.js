const { sequelize, stock_adjustments, inventory_items, users, adjustment_reasons } = require('../models');


exports.getAllAdjustedRecords = async () => {
  try {
    const items = await stock_adjustments.findAll({
      attributes: ['adjust_id', 'item_id', 'quantity', 'adjust_type', 'reason_id', 'status'], // Ensure you select 'adjust_id' explicitly
      include: [
        {
          model: inventory_items,
          as: 'itemId', 
          attributes: ['item_name'], 
        },
        {
          model: users,
          as: 'adjustedBy', 
          attributes: ['username'], 
        },
        {
          model: users,
          as: 'rejectedBy',  
          attributes: ['username'], 
        },
        {
          model: users,
          as: 'approvedBy',  
          attributes: ['username'], 
        },
        {
          model: adjustment_reasons,
          as: 'reasonId',  
          attributes: ['reason'], 
        } ,    
        
      ],
    });

    // Transform the items to the desired format
    return items.map(item => {
      return {
        adjust_id: item.adjust_id, // Use the correct column here
        item_id: item.item_id,
        quantity: item.quantity,
        adjust_type: item.adjust_type,
        reason_id: item.reason_id,
        status: item.status,
        itemName: item.itemId ? item.itemId.item_name : null, 
        reasonDet: item.reasonId ? item.reasonId.reason : null, 
        who_adjusted: item.adjustedBy ? item.adjustedBy.username : null, 
        who_rejected: item.rejectedBy ? item.rejectedBy.username : null, 
        who_approved: item.approvedBy ? item.approvedBy.username : null, 
      };
    });
  } catch (error) {
    throw new Error(`Error fetching adjusted items: ${error.message}`);
  }
};

exports.getAdjustmentById = async (id) => {
  try {
    return await stock_adjustments.findOne({where: {adjust_id: id }});
  } catch (error) {
    throw new Error(`Error fetching inventory items: ${error.message}`);
  }
};


exports.createStockAdjustment = async (data) => {
  const transaction = await sequelize.transaction(); 

  try {
    const stockAdjustment = await stock_adjustments.create(data, { transaction });

    const inventoryItem = await inventory_items.findOne({
      where: { item_id: data.item_id },
      transaction
    });

    if (!inventoryItem) {
      throw new Error('Inventory item not found');
    }

    let newQuantity;

    if (data.adjust_type === 'IN') {
      newQuantity = inventoryItem.quantity + data.quantity; 
    } else if (data.adjust_type === 'OUT') {
      if (inventoryItem.quantity < data.quantity) {
        throw new Error('Not enough stock to reduce');
      }
      newQuantity = inventoryItem.quantity - data.quantity; 
    } else {
      throw new Error('Invalid adjust type');
    }

    await inventory_items.update(
      { quantity: newQuantity },
      { where: { item_id: data.item_id }, transaction }
    );

    await transaction.commit();
    return { message: 'Stock Adjustment added successfully', item: stockAdjustment };

  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error creating adjustment: ${error.message}`);
  }
};


exports.deleteAdjustment = async (id) => {
  try {
    let response = await stock_adjustments.findByPk(id);
    if (!response) {
      const error = new Error(` Stock Adjustment not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'inactive';
    await response.save();
    return { message: "Adjustment deleted successfull", Adjustment: response };
  } catch (error) {
    throw new Error(`Error deleting Adjustment: ${error.message}`);
  }
};

exports.restoreAdjustment = async (id) => {
  try {
    let response = await stock_adjustments.findByPk(id);
    if (!response) {
      const error = new Error(` Adjustment not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'active';
    await response.save();
    return { message: "Adjustment restored successfull", Adjustment: response };
  } catch (error) {
    throw new Error(`Error restoring stock_adjustments: ${error.message}`);
  }
};

exports.editAdjustment = async (id, item_id, quantity, adjust_type, reason, status) => {
  try {
    let AdjustmentData = await stock_adjustments.findByPk(id);
    if (!AdjustmentData) {
      const error = new Error(` Adjustment not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    AdjustmentData.item_id = item_id;
    AdjustmentData.quantity = quantity;
    AdjustmentData.adjust_type = adjust_type;
    AdjustmentData.reason = reason;
    AdjustmentData.status = status;
    await AdjustmentData.save();
    return { message: "Adjustment updated successfull", Adjustment: AdjustmentData };
  } catch (error) {
    throw new Error(`Error restoring User : ${error.message}`);
  }
};