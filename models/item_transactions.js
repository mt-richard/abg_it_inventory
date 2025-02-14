
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class item_transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.inventory_items, {
        foreignKey: 'item_id',
        as: 'itemId',
      });      
      
      this.belongsTo(models.users, {
        foreignKey: 'created_by',
        as: 'createdBy',
      });

      // this.belongsTo(models.users, {
      //   foreignKey: 'assigned_user',
      //   as: 'assignedUser',
      // });

      this.belongsTo(models.locations, {
        foreignKey: 'location',
        as: 'Location',
      });

      this.belongsTo(models.divisions, {
        foreignKey: 'division',
        as: 'divisionId',
      });

      this.belongsTo(models.users, {
        foreignKey: 'updated_by',
        as: 'updatedBy',
      });

    }
  }
  item_transactions.init(
    {
      transaction_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ref_no: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      item_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "inevntory_items",
          key: "item_id",
        },
      },
      quantity: DataTypes.INTEGER,
      qty_balance: DataTypes.INTEGER,
      location: {
        type: DataTypes.INTEGER,
        references: {
          model: "locations",
          key: "location_id",
        },
      },
      division: {
        type: DataTypes.INTEGER,
        references: {
          model: "divisions",
          key: "division_id",
        },
      },
      employee: {
        type: DataTypes.INTEGER,
        references: {
          model: "employees",
          key: "employee_id",
        },
      },
      remark: DataTypes.TEXT,
      doc_type: DataTypes.ENUM("GRN", "TRN", "ADJ", "REC"),
      status: DataTypes.ENUM("active", "inactive"),
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      created_by: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      updated_by: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "user_id",
        },
      },
   
    },
    {
      sequelize,
      modelName: "item_transactions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
      freezeTableName: true,
      primaryKey: "transaction_id",
    }
  );
  return item_transactions;
};
