'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    UserId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'UserId cannot be empty'
        }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'TotalPrice cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'TotalPrice cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Status cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Status cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};