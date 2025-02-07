'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('divisions', {
      
      division_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      division_name: {
        type: Sequelize.STRING
      },
      division_code: {
        type: Sequelize.INTEGER
      },
      location_id: {
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
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      updated_at: {
        type: Sequelize.DATE
      },
      updated_by: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('divisions');
  }
};