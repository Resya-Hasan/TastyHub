const errorHandleMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err.name === 'not found') {
        res.status(404).json({ message: err.message });
    } else if (err.name === 'SequelizeValidationError') {
        res.status(400).json({ message: err.errors[0].message });
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: err.errors[0].message });
    } else if (err.name === 'SequelizeDatabaseError') {
        res.status(400).json({ message: err.message });
    } else if (err.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = errorHandleMiddleware;