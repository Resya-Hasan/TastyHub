const { User } = require('../models');

class controllUser {
    static async register(req, res, next) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email,
                    password
                }
            });
            if (!user) {
                throw { name: "not found", message: 'User not found' };
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = controllUser;