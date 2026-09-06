const pool = require('../config/db');

const UserModel = {

    // lay tat ca user 
    async findAllUsers({page = 1, limit = 10}) {
        const offset = (page -1)* limit;

        const query = `
            SELECT id, email, full_name, phone, avatar_url, role, is_active, created_at
            FROM users
            ORDER BY created_at DESC
            LIMIT $1 OFFSET $2
        `
        
        const countQuery = `SELECT COUNT(*) AS total FROM users`;

        const [data, count] = await Promise.all([
            pool.query(query, [limit, offset]),
            pool.query(countQuery)
        ])

        return {
            data: data.rows,
            total: parseInt(count.rows[0].total),
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count.rows[0].total / limit)
        }
    }
}

module.exports = UserModel;