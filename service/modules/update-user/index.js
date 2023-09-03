const express = require('express')
const cors = require('cors')

const router = express.Router();

const db = require('./../../database/index');

router.use(cors())

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { pront, nome, idade, cpf, tel, endereco, email } = req.body;

    try {
        const query = `
        UPDATE clientes 
        SET id = $1, pront = $2, nome = $3, idade = $4, cpf = $5, tel = $6, endereco = $7, email = $8
        WHERE id = $9
    `;

        await db.query(query, [id, pront, nome, idade, cpf, tel, endereco, email, id]);

        res.json(console.log('editado com sucesso'));
    } catch (error) {
        console.error('erro ao atualizar cliente', error);
        res.status(500).json({ error: 'erro ao atualizar cliente' });
    }
}
)

module.exports = router;
