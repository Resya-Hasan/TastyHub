const errorHandleMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err.name === 'not found') {
        res.status(404).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = errorHandleMiddleware;