'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.User, { foreignKey: 'UserId' });
      Wishlist.belongsTo(models.Product, { foreignKey: 'ProductId' });
    }
  }
  Wishlist.init({
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
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};