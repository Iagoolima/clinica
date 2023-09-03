const express = require('express')
const cors = require('cors')

const router = express.Router();

const db = require('./../../database/index')

router.delete('/:id', async (req, res) => {
    try {
        const agendaItemID = req.params.id; // Corrija para acessar req.params.id

        if (!agendaItemID) {
            return res.status(400).json({ message: 'ID não fornecido' });
        }

        const deleteQuery = 'DELETE FROM agenda WHERE id = $1';
        await db.query(deleteQuery, [agendaItemID]); // Use agendaItemID em vez de agendaItem

        return res.status(200).json({ message: 'Agenda deletada' });
        
    } catch (error) {
        console.error('Erro ao deletar agenda', error);
        return res.status(500).json({ message: 'Erro ao apagar agenda' });
    }
})


module.exports = router;
