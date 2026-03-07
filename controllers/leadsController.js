const Lead = require('../models/Lead')

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
    res.json(leads)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener leads' })
  }
}

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
    if (!lead) return res.status(404).json({ error: 'Lead no encontrado' })
    res.json(lead)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener lead' })
  }
}

const crearLead = async (req, res) => {
  try {
    const nuevoLead = new Lead(req.body)
    await nuevoLead.save()
    res.status(201).json(nuevoLead)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const editarLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!lead) return res.status(404).json({ error: 'Lead no encontrado' })
    res.json(lead)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const eliminarLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id)
    if (!lead) return res.status(404).json({ error: 'Lead no encontrado' })
    res.json({ mensaje: 'Lead eliminado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar lead' })
  }
}

module.exports = { getLeads, getLeadById, crearLead, editarLead, eliminarLead }