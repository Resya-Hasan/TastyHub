const { where } = require('sequelize');
const { Product, Category } = require('../models');
const { Op } = require('sequelize');

class ProductController {
    static async getProducts(req, res, next) {
        try {
            const { search, category } = req.query;

            let option = {
                include: {
                    model: Category
                },
                where: {}
            }

            if (search) {
                option.where.name = {
                    [Op.iLike]: `%${search}%`
                }
            }

            if (category) {
                option.where.CategoryId = category;
            }

            const products = await Product.findAll(option);
            res.status(200).json(products)
        } catch (error) {
            next(error);
        }
    }

    static async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(
                id,
                {
                    include: 'Category'
                }
            );
            if (!product) {
                throw { name: "not found", message: 'Product not found' };
            }
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    static async addProduct(req, res, next) {
        try {
            const product = await Product.create(req.body);
            res.status(201).json({message: `${product.name} added successfully`});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;