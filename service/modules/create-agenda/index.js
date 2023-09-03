const express = require('express');
const cors = require('cors');

const router = express.Router();

const db = require('./../../database/index');

router.use(cors());

router.post('/', async (req, res) => {
    const { dia, horario, nome, pront, tel, descricao } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO agenda (dia, horario, nome, pront, tel, descricao) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [dia, horario, nome, pront, tel, descricao]
        );

        res.status(201).json(result.rows[0])
        console.log('agenda inserida com sucesso')
    } catch (error) {
        console.error('erro ao inserir agenda', agenda);
        res.status(500).json({ error: 'erro no servidor' })
    }
});

module.exports = router