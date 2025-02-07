'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class locations extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: 'created_by',
        as: 'createdBy',
      });

      this.belongsTo(models.users, {
        foreignKey: 'updated_by',
        as: 'updatedBy',
      });
    }
  }

  locations.init({
    location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  
      autoIncrement: true 
    },
    location_name: DataTypes.STRING,
    status: DataTypes.STRING,
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
    modelName: 'locations',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    underscored: true, 
    freezeTableName: true,  
  });

  return locations;
};
