
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventory_items extends Model {
   
    static associate(models) {

      this.belongsTo(models.item_categories, {
        foreignKey: 'item_category', 
        as: 'category',
      });

      this.belongsTo(models.suppliers, {
        foreignKey: 'supplier_id',
        as: 'supplier',
      });

      this.belongsTo(models.users, {
        foreignKey: 'created_by',
        as: 'createdBy',
      });

      this.belongsTo(models.locations, {
        foreignKey: 'location',
        as: 'location_use',
      });

      this.belongsTo(models.users, {
        foreignKey: 'updated_by',
        as: 'updatedBy',
      });
    }
  }

  inventory_items.init({
    item_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    item_category: {
      type: DataTypes.INTEGER,
      references: {
        model: 'item_categories', 
        key: 'category_id' 
      }
    },
    
    item_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    item_type: DataTypes.ENUM('asset', 'expense'),
    quantity: DataTypes.INTEGER,
    unit: DataTypes.STRING,
    supplier_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'suppliers', 
        key: 'sup_id'
      }
    },

    location: {
      type: DataTypes.INTEGER,
      references: {
        model: 'locations', 
        key: 'location_id'
      }
    },
    status: DataTypes.ENUM('active', 'inactive'),
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'user_id'
      }
    },
    updated_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    modelName: 'inventory_items',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    underscored: true, 
    freezeTableName: true,  
    primaryKey: 'item_id', 
  });

  return inventory_items;
};