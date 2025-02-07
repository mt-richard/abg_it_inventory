const { sequelize, purchase_entry, inventory_items, users, locations, suppliers } = require('../models');

exports.getAllPurchases = async () => {
  try {
    const items = await purchase_entry.findAll({
      attributes: ['purchase_id', 'ref_no', 'item_id', 'supplier_id', 'quantity', 'supp_invoice_no','invoice_date','delivery_date', 'purchase_type', 'fx_rate', 'fx_symbol', 'fx_amount', 'unit_price', 'total_price', 'qty_balance', 'doc_type', 'received_location', 'warrant_info', 'status', 'created_at', 'created_by'], 
      include: [
        {
          model: inventory_items,
          as: 'itemId', 
          attributes: ['item_name'], 
        },
        {
          model: inventory_items,
          as: 'itemId', 
          attributes: ['unit'], 
        },
        {
          model: users,
          as: 'createdBy', 
          attributes: ['username'], 
        },
        {
          model: locations,
          as: 'receivedLocation', 
          attributes: ['location_name'], 
        },
        {
          model: suppliers,
          as: 'supplieredBy', 
          attributes: ['sup_name'], 
        },
      ],
    });

    return items.map(item => {
      return {
        purchase_id: item.purchase_id, 
        ref_no: item.ref_no, 
        item_id: item.item_id,
        supplier_id: item.supplier_id,
        quantity: item.quantity,
        supp_invoice_no: item.supp_invoice_no,
        invoice_date: item.invoice_date,
        delivery_date: item.delivery_date,
        purchase_type: item.purchase_type,
        fx_rate: item.fx_rate,
        fx_symbol: item.fx_symbol,
        fx_amount: item.fx_amount,
        unit_price: item.unit_price,
        total_price: item.total_price,
        doc_type: item.doc_type,
        qty_balance: item.qty_balance,
        received_location: item.received_location,
        warrant_info: item.warrant_info,
        created_at: item.created_at,
        created_by: item.created_by,
        status: item.status,
        itemName: item.itemId ? item.itemId.item_name : null, 
        itemUnit: item.itemId ? item.itemId.unit : null, 
        received_location_name: item.receivedLocation ? item.receivedLocation.location_name : null, 
        supplier_name: item.supplieredBy ? item.supplieredBy.sup_name : null, 
        
      };
    });
  } catch (error) {
    throw new Error(`Error fetching adjusted items: ${error.message}`);
  }
};

exports.getPurchaseById = async (id) => {
  try {
    return await purchase_entry.findOne({where: {purchase_id: id }});
  } catch (error) {
    throw new Error(`Error fetching inventory items: ${error.message}`);
  }
};

exports.createPurchaseEntry = async (data) => {
  const transaction = await sequelize.transaction();

  try {
    const purchaseQty = parseInt(data.quantity, 10);
    if (isNaN(purchaseQty) || purchaseQty <= 0) {
      throw new Error("Invalid quantity. Must be a positive integer.");
    }

    let unitPrice = data.unit_price;
    if (data.purchase_type === "import") {
      unitPrice = data.fx_rate * data.fx_amount;
    }

    const totalPrice = unitPrice * purchaseQty;
    const currentDate = new Date();
    const yearShort = String(currentDate.getFullYear()).slice(-2); 

    const lastEntry = await purchase_entry.findOne({
      order: [["purchase_id", "DESC"]],
      attributes: ["ref_no"],
      transaction,
    });

    let lastNumber = 1; 
    if (lastEntry && lastEntry.ref_no) {
      const match = lastEntry.ref_no.match(/PE(\d+)-(\d{2})/);
      if (match) {
        lastNumber = parseInt(match[1], 10) + 1;
      }
    }

    const refNo = `PE${String(lastNumber).padStart(3, "0")}-${yearShort}`;
    let newQuantity = 0; 

    if (data.doc_type === "GRN") {
      const inventoryItem = await inventory_items.findOne({
        where: { item_id: data.item_id },
        transaction,
      });

      if (!inventoryItem) {
        throw new Error("Inventory item not found");
      }

      newQuantity = inventoryItem.quantity + purchaseQty;

      await inventory_items.update(
        { quantity: newQuantity },
        { where: { item_id: data.item_id }, transaction }
      );
    }

    const purchaseEntry = await purchase_entry.create(
      {
        item_id: data.item_id,
        supplier_id: data.supplier_id,
        received_location: data.received_location,
        quantity: purchaseQty,
        supp_invoice_no: data.supp_invoice_no,
        invoice_date: data.invoice_date,
        delivery_date: data.delivery_date,
        purchase_type: data.purchase_type,
        fx_rate: data.fx_rate,
        fx_symbol: data.fx_symbol,
        fx_amount: data.fx_amount,
        unit_price: unitPrice,
        total_price: totalPrice,
        doc_type: data.doc_type,
        ref_no: refNo,
        qty_balance: newQuantity || data.qty_balance, 
        warrant_info: data.warrant_info,
        status: data.status || "active",
        created_by: data.created_by,
      },
      { transaction }
    );

    await transaction.commit();

    return { message: "Purchase Entry recorded successfully", item: purchaseEntry };
  } catch (error) {
    await transaction.rollback();
    throw new Error(`Error creating purchase entry: ${error.message}`);
  }
};

