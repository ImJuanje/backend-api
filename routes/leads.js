const express = require('express')
const router = express.Router()
const { getLeads, getLeadById, crearLead, editarLead, eliminarLead } = require('../controllers/leadsController')
const { protegerRuta } = require('../middleware/auth')

router.get('/', protegerRuta, getLeads)
router.get('/:id', protegerRuta, getLeadById)
router.post('/', protegerRuta, crearLead)
router.put('/:id', protegerRuta, editarLead)
router.delete('/:id', protegerRuta, eliminarLead)

module.exports = router
