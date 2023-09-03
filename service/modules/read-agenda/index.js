const express = require('express')
const cors = require('cors')

const router = express.Router();

const db = require('./../../database/index');

router.use(cors());

router.get('/', async (req, res) => {

    try{
        const query = 
        'SELECT * FROM agenda';
        const result = await db.query(query);
        res.status(200).json(result.rows);
    }catch (error) {
        console.error('erro ao consultar agenda', error);
        res.status(500).json({ error: 'erro ao servidor ' })
    }
    
})

module.exports = router;


