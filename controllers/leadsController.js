let leads = [
  { id: 1, nombre: 'Juan García', email: 'juan@gmail.com', estado: 'nuevo' },
  { id: 2, nombre: 'María López', email: 'maria@gmail.com', estado: 'en proceso' },
  { id: 3, nombre: 'Carlos Ruiz', email: 'carlos@gmail.com', estado: 'ganado' }
]

const getLeads = (req, res) => {
  res.json(leads)
}

const getLeadById = (req, res) => {
  const lead = leads.find(l => l.id === parseInt(req.params.id))
  if (!lead) return res.status(404).json({ error: 'Lead no encontrado' })
  res.json(lead)
}

const crearLead = (req, res) => {
  if (!req.body.nombre || !req.body.email) {
    return res.status(400).json({ error: 'Nombre y email son obligatorios' })
  }
  const nuevoLead = {
    id: Date.now(),
    nombre: req.body.nombre,
    email: req.body.email,
    estado: req.body.estado || 'nuevo'
  }
  leads.push(nuevoLead)
  res.status(201).json(nuevoLead)
}

const editarLead = (req, res) => {
  const index = leads.findIndex(l => l.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Lead no encontrado' })
  leads[index] = { ...leads[index], ...req.body }
  res.json(leads[index])
}

const eliminarLead = (req, res) => {
  const index = leads.findIndex(l => l.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Lead no encontrado' })
  leads.splice(index, 1)
  res.json({ mensaje: 'Lead eliminado' })
}

module.exports = { getLeads, getLeadById, crearLead, editarLead, eliminarLead }