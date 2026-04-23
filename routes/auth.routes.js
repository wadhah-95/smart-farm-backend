// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// US1: Inscription
router.post('/register', authController.register);

// US4: Voir mon profil (protégé par JWT)
router.get('/me', authMiddleware, authController.getProfile);

module.exports = router;