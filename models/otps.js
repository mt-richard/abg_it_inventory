'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class otps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations
      models.users.hasOne(otps, { foreignKey: 'email', sourceKey: 'email' });
      otps.belongsTo(models.users, { foreignKey: 'email', targetKey: 'email' });
    }
  }

  otps.init({
    otp_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'email',   
      },
    },
    expiry: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  }, {
    sequelize,
    modelName: 'otps',
  });

  return otps;
};
