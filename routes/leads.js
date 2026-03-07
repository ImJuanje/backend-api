const express = require('express')
const router = express.Router()
const { getLeads, getLeadById, crearLead, editarLead, eliminarLead } = require('../controllers/leadsController')

router.get('/', getLeads)
router.get('/:id', getLeadById)
router.post('/', crearLead)
router.put('/:id', editarLead)
router.delete('/:id', eliminarLead)

module.exports = router