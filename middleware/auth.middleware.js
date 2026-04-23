// middleware/auth.middleware.js
const { verifyToken } = require('../utils/jwt');

const authMiddleware = (req, res, next) => {
    // Récupérer le token du header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false, 
            message: 'Access denied. No token provided.' 
        });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ 
            success: false, 
            message: 'Invalid or expired token.' 
        });
    }

    // Ajouter les infos utilisateur à la requête
    req.user = decoded;
    next();
};

module.exports = authMiddleware;