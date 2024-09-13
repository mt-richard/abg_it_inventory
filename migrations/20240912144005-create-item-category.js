'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Item_categories', {
     
      category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),  // ENUM for status
        allowNull: false,
        defaultValue: 'active'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      updated_by: {
        type: Sequelize.INTEGER
      },
      
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the Item_categories table and the associated ENUM type for status
    await queryInterface.dropTable('Item_categories');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Item_categories_status";');  // Drop ENUM type for status
  }
};
