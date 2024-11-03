const { inventory_items, item_categories, suppliers } = require('../models');

exports.getAllItemsInStock = async () => {
  try {
    const items = await inventory_items.findAll({
      include: [
        {
          model: item_categories,
          as: 'category', 
          attributes: ['category_name'], 
        },
        {
          model: suppliers,
          as: 'supplier', 
          attributes: ['sup_name'], 
        },
      ],
    });

    // Transform the items to the desired format
    return items.map(item => {
      return {
        item_id: item.item_id,
        item_category: item.item_category,
        item_name: item.item_name,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        supplier_id: item.supplier_id,
        location: item.location,
        status: item.status,
        created_at: item.created_at,
        updated_at: item.updated_at,
        created_by: item.created_by,
        updated_by: item.updated_by,
        category_name: item.category ? item.category.category_name : null, // Use the extracted category_name
        sup_name: item.supplier ? item.supplier.sup_name : null // Use the extracted supplier name
      };
    });
  } catch (error) {
    throw new Error(`Error fetching inventory items: ${error.message}`);
  }
};

exports.getItemById = async (id) => {
  try {
    return await inventory_items.findOne({where: {item_id: id }});
  } catch (error) {
    throw new Error(`Error fetching inventory items: ${error.message}`);
  }
};

exports.getByName = async (name) => {
  try {
    return await inventory_items.findOne({ where: { item_name: name } });
  } catch (error) {
    throw new Error(`Error fetching items: ${error.message}`);
  }
};


exports.createItems = async (data) => {
  try {
    const response =  await inventory_items.create(data);
    return { message: "Item added successfull", item: response };
  } catch (error) {
    throw new Error(`Error creating Item: ${error.message}`);
  }
};

exports.deleteSupplier = async (id) => {
  try {
    let response = await inventory_items.findByPk(id);
    if (!response) {
      const error = new Error(` supplier not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'inactive';
    await response.save();
    return { message: "Supplier deleted successfull", supplier: response };
  } catch (error) {
    throw new Error(`Error deleting supplier: ${error.message}`);
  }
};

exports.restoreSupplier = async (id) => {
  try {
    let response = await inventory_items.findByPk(id);
    if (!response) {
      const error = new Error(` supplier not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    response.status = 'active';
    await response.save();
    return { message: "Supplier restored successfull", supplier: response };
  } catch (error) {
    throw new Error(`Error restoring inventory_items: ${error.message}`);
  }
};

exports.editSupplier = async (id, name, contact, status) => {
  try {
    let supplierData = await inventory_items.findByPk(id);
    if (!supplierData) {
      const error = new Error(` supplier not found with id: ${id}`);
      error.statusCode = 404; 
      throw error;
    }
    supplierData.sup_name = name;
    supplierData.contact = contact;
    supplierData.status = status;
    await supplierData.save();
    return { message: "Supplier updated successfull", supplier: supplierData };
  } catch (error) {
    throw new Error(`Error restoring User : ${error.message}`);
  }
};