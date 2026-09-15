import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool ({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : String(process.env.DB_PASSWORD || ''),
    database : process.env.DB_NAME,
    port : process.env.DB_PORT
})

pool.connect().then(() => console.log("Connect DB successfully")) .catch((err) => console.error("Error connecting to DB:", err));

export default pool;


