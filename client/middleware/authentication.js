const { verifyToken } = require("../helpers/jwt");
const { User } = require('../models');

const authentication = async (req, res, next) => {
    try{
        
        const { authorization } = req.headers;
        
        if (!authorization) {
            throw { name: "Unathorized", message: 'Invalid token' };
        }
        
        const rawToken = authorization.split(' ')
        if (rawToken[0] !== 'Bearer' || !rawToken[1]) {
            throw { name: "Unathorized", message: 'Invalid token' };
        }

        const result = verifyToken(rawToken[1]);

        const user = await User.findByPk(result.id);

        if (!user) {
            throw { name: "Unathorized", message: 'Invalid token' };
        }

        req.user = {
            id: user.id,
            role: user.role
        }

        // console.log('sudah autentikasi')

        next()
    } catch(err) {
        next(err)
    }
    
}

module.exports = authentication;