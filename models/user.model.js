// models/user.model.js
const pool = require('../config/db');

class UserModel {
    // Créer un nouvel utilisateur
    static async create(userData) {
        const { email, password, name, role } = userData;
        const query = `
            INSERT INTO users (email, password, name, role, created_at)
            VALUES ($1, $2, $3, $4, NOW())
            RETURNING id, email, name, role, created_at
        `;
        const values = [email, password, name, role || 'farmer'];
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    // Trouver un utilisateur par email
    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }

    // Trouver un utilisateur par ID
    static async findById(id) {
        const query = 'SELECT id, email, name, role, created_at FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = UserModel;