const { or } = require("sequelize");
const { Order, OrderDetail, Product } = require("../models");

class ControllOrder {
    static async createOrder(req, res, next) {
        try {
            const UserId = req.user.id;
            let { items } = req.body;

            let totalPrice = 0;
            const productData = await Promise.all(
                items.map(async (el) => {
                    let product = await Product.findByPk(el.ProductId);
                    if (!product) {
                        throw { name: "not found", message: 'Product not found' };
                    }

                    const subtotal = product.price * el.quantity;
                    totalPrice += subtotal;

                    return {
                        ...el,
                        price: product.price,
                        subtotal
                    }
                })
            )

            const order = await Order.create({
                UserId,
                totalPrice,
                status: 'pending'
            });

            const orderDetail = productData.map((el) => {
                return {
                    OrderId: order.id,
                    ProductId: el.ProductId,
                    quantity: el.quantity,
                    price: el.price,
                    subtotal: el.subtotal
                }
            })

            await OrderDetail.bulkCreate(orderDetail);

            res.status(201).json({
                message: "Order created successfully",
                order
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = ControllOrder; 