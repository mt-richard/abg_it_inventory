'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class divisions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.locations, {
        foreignKey: 'location_id', 
        as: 'location',
      });

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
  divisions.init({
    division_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  
      autoIncrement: true 
    },
    division_name: DataTypes.STRING,
    division_code: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    status: DataTypes.ENUM('active', 'inactive'),
    created_at: DataTypes.DATE,
    created_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'user_id'
      }
    },
    updated_at: DataTypes.DATE,
    updated_by: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    modelName: 'divisions',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    underscored: true, 
    freezeTableName: true,  
  });
  return divisions;
};