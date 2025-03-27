const errorHandleMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err.name === 'not found') {
        return res.status(404).json({ message: err.message });
    }

    if (err.name === 'badRequest') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === "Forbidden") {
        return res.status(403).json({ message: err.message })
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(400).json({ message: "Invalid token" });
    }

    if (err.name === 'Unathorized') {
        return res.status(401).json({ message: err.message });
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: err.errors[0].message });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: err.errors[0].message });
    }

    if (err.name === 'SequelizeDatabaseError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Internal server error' });

}


module.exports = errorHandleMiddleware;