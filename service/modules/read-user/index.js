const express = require('express');
const cors = require('cors');

const router = express.Router();

const db = require('./../../database/index')

router.use(cors());

router.get('/', async (req, res) => {
    const { search } = req.query;

    try {

        let query = 'SELECT * FROM clientes WHERE nome ILIKE $1 OR pront ILIKE $1';
        const result = await db.query(query, [`%${search}%`]);
        res.status(200).json(result.rows);

    } catch (error) {
        console.error('erro ao consultar clientes', error);
        res.status(500).json({ error: 'erro ao servidor ' })
    }
});

module.exports = router;
