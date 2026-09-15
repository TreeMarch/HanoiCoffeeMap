import pool from '../config/db.js';

const UserModel = {

    // GET =============================================
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

    // =============================================

    // POST =============================================
    // tao nguoi dung user moi
    async createUser({email, password_hash,full_name}) {
        const query = `insert into users (email, password_hash, full_name)
        values ($1, $2, $3) returning id, email, full_name`;

        const values = [email, password_hash , full_name];
        const result = await pool.query(query, values);
        return result.rows[0];

    },

    // cap nhat thong tin nguoi dung - admin
    async updateUser(id, {email, password_hash, full_name, phone, avatar_url, role, is_active}) {
        const query = `update users set email = $1, password_hash = $2, full_name = $3, phone = $4, avatar_url = $5, role = $6, is_active = $7 where id = $8 returning id, email, full_name, phone, avatar_url, created_at`;

        const values = [email, password_hash, full_name, phone ?? null, avatar_url ?? null,id];
        const result = await pool.query(query, values);
        return result.rows[0];

    },

    // xoa nguoi dung - admin
    async deleteUser(id) {
        const query = `delete from users where id = $1 returning *`;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    // ========== cac ham lien quan den dang nhap, dang ky, quen mat khau, doi mat khau se duoc viet o day ==========
    // tim user theo email cho login 
    async findUserByEmail(email) {
        const result = await pool.query(`select * from users where email = $1`, [email]);
        return result.rows[0] || null;
    },
    
    // tim user theo id cho getMe
    async findUserById(id) {
        const result = await pool.query(`select id, email, full_name, phone, avatar_url, role, is_active, created_at from users where id = $1`, [id]);
        return result.rows[0] || null;
    },

    //kiem tra email da ton tai chua cho dang ky
    async isEmailExists(email) {
        const result = await pool.query(`select id from users where email = $1`, [email]);
        return result.rows.length > 0;
    }
    
}

export default UserModel;