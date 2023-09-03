const express = require('express');
const cors = require('cors');

const router = express.Router();

const db = require('./../../database/index');

router.use(cors());

router.post('/', async (req, res) => {
  const { pront, nome, idade, cpf, tel, endereco, email } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO clientes (pront, nome, idade, cpf, tel, endereco, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [pront, nome, idade, cpf, tel, endereco, email]
    );

    res.status(201).json(result.rows[0]);
    console.log("cliente inserido com sucesso");
  } catch (error) {
    console.error('erro ao inserir cliente', error);
    res.status(500).json({ error: 'erro no servidor' });
  }
});

module.exports = router;
