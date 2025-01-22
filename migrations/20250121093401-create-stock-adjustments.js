'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stock_adjustments', {
      
      adjust_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'inventory_items',
          key: 'item_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      adjust_type: {
        type: Sequelize.ENUM('IN', 'OUT'),
        allowNull: false,
      },
      reason_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'adjustment_reasons',
          key: 'reason_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      adjusted_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      adjusted_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
        allowNull: false,
        defaultValue: 'active'
      },
      rejected_at: {
        type: Sequelize.DATE
      },
      reject_reason: {
        type: Sequelize.TEXT
      },
      rejected_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      approved_at: {
        type: Sequelize.DATE
      },
      approved_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stock_adjustments');
  }
};