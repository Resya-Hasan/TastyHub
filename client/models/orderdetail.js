'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      OrderDetail.belongsTo(models.Order, {foreignKey: 'OrderId'})
      OrderDetail.belongsTo(models.Product, {foreignKey: 'ProductId'})
    }
  }
  OrderDetail.init({
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'OrderId cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'OrderId cannot be empty'
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'ProductId cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'ProductId cannot be empty'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Quantity cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Quantity cannot be empty'
        },
        min: {
          args: [1],
          msg: 'Quantity cannot be less than 1'
        }
      }
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Subtotal cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Subtotal cannot be empty'
        },
        min: {
          args: [0],
          msg: 'Subtotal cannot be less than 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};