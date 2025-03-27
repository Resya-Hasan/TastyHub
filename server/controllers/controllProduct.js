const { Product, Category } = require('../models');
const { Op } = require('sequelize');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');

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
            res.status(201).json({ message: `${product.name} added successfully` });
        } catch (error) {
            next(error);
        }
    }

    static async editProduct(req, res, next) {
        try {
            const { id } = req.params;

            const product = await Product.findByPk(id);
            if (!product) {
                throw { name: "not found", message: 'Product not found' };
            }

            await product.update(req.body);
            res.status(200).json({ message: `${product.name} updated successfully` });
        } catch (error) {
            next(error);
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;

            const product = await Product.findByPk(id);
            if (!product) {
                throw { name: "not found", message: 'Product not found' };
            }

            await product.destroy({
                where: {
                    id
                }
            });

            res.status(200).json({ message: `${product.name} deleted successfully` });
        } catch (error) {
            next(error);
        }
    }

    static async recommendProduct(req, res, next) {
        try {
            const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAi.getGenerativeModel({ model: "gemini-2.0-flash" });

            const products = await Product.findAll();

            const productList = products.map(el => `${el.name} - ${el.description} (${el.price} IDR), ${el.imageUrl}, ${el.stock}, ${el.CategoryId}`).join("\n");
            const userPreference = req.query.preference || "makanan enak dan populer";

            console.log(productList)

            const prompt = `
            Saya punya daftar menu berikut:
            ${productList}

            Berdasarkan preferensi pengguna: "${userPreference}", tolong pilih beberapa menu yang paling cocok.
            
            Harus **hanya JSON valid saja** tanpa penjelasan atau teks tambahan:
            [
              {
                "name": "Nama Menu",
                "description": "Deskripsi",
                "price": 0,
                "stock": 0,
                "imageUrl": "url",
                "CategoryId": 1
              }
            ]

            Jangan berikan penjelasan atau teks lain selain JSON valid. Cukup JSON saja.
            `;

            const result = await model.generateContent({
                contents: [{ parts: [{ text: prompt }] }]
            });

            const recommendation = result.response.text().replace("```json", "").replace("```", "");

            res.status(200).json(JSON.parse(recommendation));
        } catch (error) {
            next(error);
        }
    }

    static async getImages(req, res, next) {
        try {
            const query = req.query.query || 'burger';

            const response = await axios.get('https://api.unsplash.com/photos/random', {
                params: { query },
                headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
            });

            const imageUrl = response.data.urls.regular;
            res.status(200).json({ imageUrl });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;