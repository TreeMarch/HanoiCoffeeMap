import pool from '../config/db.js';

const CafeModel = {
    // lay tat ca cac quan cafe 
    async findAllCafes({page = 1, limit = 10}) {
        const offset = (page - 1) * limit;

        const query = `
            SELECT c.id, c.name,c.slug,c.description,c.address, c.district, c.phone, c.website, c.created_at, c.avg_rating,c.approval_status,c.operating_status, u.full_name AS owner_name, u.email AS owner_email
            FROM cafes c
            LEFT JOIN users u ON u.id = c.owner_id 
            ORDER BY c.created_at DESC
            LIMIT $1 OFFSET $2
        `

        const countQuery = `SELECT COUNT(*) AS total FROM cafes`;

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

    // lay thong tin chi tiet cua quan cafe theo id
    async findCafeById(id) {
        const query = `select c.*,
        u.full_name AS owner_name,
        u.email AS owner_email, 
        u.phone AS owner_phone,
        -- lay danh sach hinh anh cua quan cafe
        coalesce (json_agg(distinct json_build_object(
            'id', ci.id,
            'image_url', ci.image_url,
            'is_primary', ci.is_primary,
            'display_order', ci.display_order
        )), '[]') AS images,
        -- lay danh sach tag cua quan cafe
        coalesce (json_agg(distinct json_build_object(
            'id', t.id,
            'name', t.name,
            'icon', t.icon,
        )) filter (where t.id IS NOT NULL), '[]') AS tags
        -- lay menu cua quan cafe
        coalesce (json_agg(distinct json_build_object(
            'id', m.id,
            'category', m.category,
            'item_name', m.item_name,
            'price', m.price,
            'is_available', m.is_available
        )) filter (where m.id IS NOT NULL), '[]') AS menu_items
        from cafes c 
        left join user u ON u.id = c.owner_id
        left join cafe_images ci ON ci.cafe_id = c.id
        left join cafe_tags ct ON ct.cafe_id = c.id
        left join menu m ON m.cafe_id = c.id
        where c.id = $1
        group by c.id, u.full_name, u.email, u.phone
        `
        const result = await pool.query(query, [id]);
        return result.rows[0] || null
    },

    // kiem tra slug da ton tai chua => tra ve true/false
     async slugExists(slug,excludeId = null) {
        const query = excludeId 
        ? `select id from cafes where slug = $1 and id != $2`
        : `select id from cafes where slug = $1`;

        const values = excludeId ? [slug, excludeId] : [slug];
        const result = await pool.query(query, values);
        return result.rows.length > 0;
    },


    // them quan moi 
    async createCafe({owner_id, name, slug, description, address, district, phone, website, latitude, longitude, open_time,close_time,price_min, price_max, wifi, has_parking, approval_status,operating_status}) {
        const query = `insert into cafes (owner_id, name, slug, description, address, district, phone, website, latitude, longitude, open_time, close_time, price_min, price_max, wifi, has_parking, approval_status, operating_status)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
        returning *`;

        //set gia tri mac dinh cho cac truong khong bat buoc
        const values = [owner_id || null, name, slug, description ?? null, address, district, phone || null, website ?? null, latitude, longitude, open_time || null, close_time || null, price_min ?? null, price_max ?? null, wifi, has_parking ?? false, approval_status || "PENDING", operating_status || "open"];

        const result = await pool.query(query, values);
        return result.rows[0];
    },

    //cap nhat thong tin quan cafe
    async updateCafe(id,fields) {
        // chi cap nhat cac truong duoc truyen vao
        const allowed = ['name', 'description', 'address', 'district', 'phone', 'website', 'latitude', 'longitude', 'open_time', 'close_time', 'price_min', 'price_max', 'wifi', 'has_parking', 'approval_status', 'operating_status'];
        
        const updates = []
        const values = []
        let index = 1;

        for (const key of allowed) {
            if(fields[key] !== undefined) {
                updates.push(`${key} = $${index++}`);
                values.push(fields[key]);
            }
        }

        if( updates.length === 0) return null;
        
        values.push(id);
        const query = `update cafes set ${updates.join(', ')}, updated_at = NOW() where id = $${index} returning *`;
        const result = await pool.query(query, values);
        return result.rows[0] || null;
    },


    // xoa quan cafe
    async deleteCafe(id) {
        const result = await pool.query(`delete from cafes where id = $1 returning id, name`, [id]);
        return result.rows[0] || null;
    },

    // duyet quan cafe 
    async approveCafe(id, {approval_status, reject_reason}) {
        const result = await pool.query (
            `update cafes 
             set approval_status = $1, reject_reason = $2, updated_at = NOW()
             where id = $3 returning *
        `, [approval_status, reject_reason, id]);
        return result.rows[0] || null;
    },
   

}

export default CafeModel;