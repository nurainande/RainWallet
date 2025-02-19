const jwt = require('jsonwebtoken');

// Decode token
module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log('token', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('userId',decoded.id)
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).send({
            message: error.message,
            success: false,
        });
    }
};