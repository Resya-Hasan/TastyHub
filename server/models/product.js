'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {foreignKey: 'CategoryId'})
      Product.hasMany(models.OrderDetail, {foreignKey: 'ProductId'})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Name cannot be empty'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Description cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Price cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Price cannot be empty'
        },
        min: {
          args: [10000],
          msg: 'Price cannot be less than 10000'
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'ImageUrl cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'ImageUrl cannot be empty'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'CategoryId cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'CategoryId cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Stock cannot be empty'
        },
        min: {
          args: [0],
          msg: 'Stock cannot be less than 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};