import pool from '../services/database.service.js';

export const getUsers = async (req, res) => {
    const query = 'SELECT * FROM customers;';
    const { rows } = await pool.query(query);
    res.status(200).json(rows[0]);

    return rows;
}