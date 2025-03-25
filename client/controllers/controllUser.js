const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

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

            if (!email) {
                throw { name: "badRequest", message: 'Email is required' };
            }

            if (!password) {
                throw { name: "badRequest", message: 'Password is required' };
            }

            const user = await User.findOne({
                where: {
                    email
                }
            });

            if (!user) {
                throw { name: "Unathorized", message: 'Invalid Email/password' };
            }

            const isValidPassword = comparePassword(password, user.password);
            if (!isValidPassword) {
                throw { name: "Unathorized", message: 'Invalid Email/password' };
            }

            const acceaaToken = signToken({id: user.id});

            res.status(200).json({acceaaToken});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = controllUser;