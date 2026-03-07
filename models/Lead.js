const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  estado: {
    type: String,
    enum: ['nuevo', 'en proceso', 'ganado', 'perdido'],
    default: 'nuevo'
  },
  telefono: {
    type: String
  },
  empresa: {
    type: String
  }
}, { timestamps: true })

module.exports = mongoose.model('Lead', leadSchema)