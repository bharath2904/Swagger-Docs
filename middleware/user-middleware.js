const jwt = require('jsonwebtoken');

const userMiddleware = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access Denied, Token Required'
        });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Token'
        });
    }
};

module.exports = userMiddleware;
