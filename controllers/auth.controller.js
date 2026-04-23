// controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');
const { generateToken } = require('../utils/jwt');

// US1: Inscription
const register = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        // 1. Valider les données
        if (!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: 'Email, password and name are required.'
            });
        }

        // Valider format email (simple)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format.'
            });
        }

        // Valider longueur mot de passe
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters.'
            });
        }

        // 2. Vérifier si l'utilisateur existe déjà
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists with this email.'
            });
        }

        // 3. Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Sauvegarder en DB
        const newUser = await UserModel.create({
            email,
            password: hashedPassword,
            name,
            role: role || 'farmer'
        });

        // 5. Générer un token JWT
        const token = generateToken(newUser.id, newUser.email, newUser.role);

        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: {
                user: newUser,
                token
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

// US4: Voir mon profil (GET /auth/me)
const getProfile = async (req, res) => {
    try {
        // req.user vient du middleware authMiddleware
        const userId = req.user.id;
        
        const user = await UserModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        res.status(200).json({
            success: true,
            data: { user }
        });

    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        });
    }
};

module.exports = { register, getProfile };