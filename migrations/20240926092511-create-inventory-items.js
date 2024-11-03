'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventory_items', {
      
      item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'item_categories', 
          key: 'category_id',
        },
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL'  
      },
      item_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      unit: {
        type: Sequelize.STRING
      },
      supplier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'suppliers',
          key: 'sup_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      location: {
        type: Sequelize.INTEGER,
        references: {
          model: 'locations', 
          key: 'location_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        allowNull: false,
        defaultValue: 'active'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      created_by: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      updated_by: {
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
    await queryInterface.dropTable('inventory_items');
  }
};