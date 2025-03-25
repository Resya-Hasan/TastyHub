const errorHandleMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err.name === 'not found') {
        res.status(404).json({ message: err.message });
    }

    if (err.name === 'badRequest') {
        res.status(400).json({ message: err.message });
    }

    if (err.name === 'JsonWebTokenError') {
        res.status(400).json({ message: "Invalid token" });
    }

    if (err.name === 'Unathorized') {
        res.status(401).json({ message: err.message });
    }

    if (err.name === 'SequelizeValidationError') {
        res.status(400).json({ message: err.errors[0].message });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: err.errors[0].message });
    }

    if (err.name === 'SequelizeDatabaseError') {
        res.status(400).json({ message: err.message });
    }

    if (err.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({ message: err.message });
    }

    res.status(500).json({ message: 'Internal server error' });

}


module.exports = errorHandleMiddleware;