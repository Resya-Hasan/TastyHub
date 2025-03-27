const { Wishlist } = require('../models');

class ControllWishlist {
    static async addWishlist(req, res, next) {
        try {
            const { productId } = req.params;
            const { id } = req.user;
            const wishlist = await Wishlist.create({
                UserId: id,
                ProductId: productId
            });
            res.status(201).json(wishlist);
        }catch(err) {
            next(err)
        }
    }

    static async deleteWishlist(req, res, next) {
        try {
            const { productId } = req.params;
            const { id } = req.user;
            const wishlist = await Wishlist.destroy({
                where: {
                    UserId: id,
                    ProductId: productId
                }
            });
            res.status(200).json({message: 'Wishlist deleted successfully'});
        }catch(err) {
            next(err)
        }
    }

}

module.exports = ControllWishlist