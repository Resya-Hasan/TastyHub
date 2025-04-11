const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

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

            const user = await User.findOne({ where: { email } });

            if (!user || !comparePassword(password, user.password)) {
                throw { name: "Unauthorized", message: 'Invalid Email/password' };
            }

            const access_token = signToken({ id: user.id });

            res.status(200).json({ access_token });
        } catch (error) {
            next(error);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { googleToken } = req.body

            const client = new OAuth2Client()
            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.CLIENT_ID_GOOGLE
            })

            const payload = ticket.getPayload()
            const [user] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: Math.random().toString(36).slice(-8),
                }
            })
            const access_token = signToken({ id: user.id })
            res.status(200).json({
                access_token: access_token,
                id: user.id
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = controllUser;
