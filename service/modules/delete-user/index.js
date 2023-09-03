const express = require('express')
const cors = require('cors')

const router = express.Router();

const db = require('./../../database/index')

router.delete('/:clientId', async (req, res) =>{
    try{
        const clientId = req.params.clientId;

        if(!clientId){
            return res.status(400).json(({message:'id nao fonrecido'}))
        }

        const deleteQuery = 'DELETE FROM clientes WHERE id = $1'
        await db.query(deleteQuery, [clientId])

        return res.status(200).json({message: 'cliente deletado'})
        
    }catch(error){
        console.error('erro ao deletar usuario', error)
        return res.status(500).json({message: 'erro ao apagar'})
    }
    
})


module.exports = router;
