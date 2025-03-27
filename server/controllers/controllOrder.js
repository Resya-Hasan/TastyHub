const { User, Order, OrderDetail, Product } = require("../models");

class ControllOrder {
    static async createOrder(req, res, next) {
        try {
            const UserId = req.user.id;
            let { items } = req.body;

            if (!items || items.length === 0) {
                throw { name: "badRequest", message: 'Items is required' };
            }

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
                status: 'diroses'
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

    static async getOrders(req, res, next) {
        try {
            const orders = await Order.findAll({
                include: [
                    { model: User, attributes: { exclude: ['password'] } },
                    {
                        model: OrderDetail,
                        include: { model: Product, attributes: ['name', 'price', 'imageUrl'] }
                    }
                ]
            });

            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    static async updateOrderStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const validStatus = ['diproses', 'dikirim', 'selesai'];

            if (!validStatus.includes(status)) {
                throw { name: "badRequest", message: 'Invalid status' };
            }

            const order = await Order.findByPk(id);
            if (!order) {
                throw { name: "not found", message: 'Order not found' };
            }

            await order.update({ status });
            res.status(200).json({ message: 'Order status updated' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ControllOrder; 