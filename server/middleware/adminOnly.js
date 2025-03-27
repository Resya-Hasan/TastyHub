

const adminOnly = (req, res, next) => {
    try{
        if (req.user.role === 'Admin') {
            next();
        } else {
            throw { name: "Forbidden", message: "You are not authorized" };
        }
    }catch (err) {
        next(err);
    }
}

module.exports = adminOnly;