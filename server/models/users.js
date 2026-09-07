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
    },

    // lay thong tin chi tiet cua user theo id

    // tao nguoi dung user moi - admin 
    async createUser({email, password_hash,full_name, phone, avatar_url, role, is_active}) {
        const query = `insert into users (email, password_hash, full_name, phone, avatar_url, role, is_active)
        values ($1, $2, $3, $4, $5, $6, $7) returning *`;

        const values = [email, password_hash, full_name, phone ?? null, avatar_url ?? null, role || 'USER', is_active ?? true];
        const result = await pool.query(query, values);
        return result.rows[0];

    },

    // cap nhat thong tin nguoi dung - admin
    async updateUser(id, {email, password_hash, full_name, phone, avatar_url, role, is_active}) {
        const query = `update users set email = $1, password_hash = $2, full_name = $3, phone = $4, avatar_url = $5, role = $6, is_active = $7 where id = $8 returning *`;

        const values = [email, password_hash, full_name, phone ?? null, avatar_url ?? null, role || 'USER', is_active ?? true, id];
        const result = await pool.query(query, values);
        return result.rows[0];

    },

    // xoa nguoi dung - admin
    async deleteUser(id) {
        const query = `delete from users where id = $1 returning *`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

}

module.exports = UserModel;