const { Product } = require('../models');

class ProductController {
    static async getProducts(req, res, next) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products)
        } catch (error) {
            next(error);
        }
    }

    static async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (!product) {
                throw { name: "not found", message: 'Product not found' };
            }
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;