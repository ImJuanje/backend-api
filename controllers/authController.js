const jwt = require('jsonwebtoken')
const User = require('../models/User')

const registro = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    // Verificar si el usuario ya existe
    const usuarioExiste = await User.findOne({ email })
    if (usuarioExiste) {
      return res.status(400).json({ error: 'El email ya está registrado' })
    }

    // Crear usuario (la contraseña se encripta sola con el pre-save)
    const usuario = await User.create({ nombre, email, password })

    // Generar token
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol } })
  } catch (error) {
      console.log('ERROR COMPLETO:', error)
  res.status(400).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Buscar usuario
    const usuario = await User.findOne({ email })
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    // Verificar contraseña
    const passwordCorrecta = await usuario.compararPassword(password)
    if (!passwordCorrecta) {
      return res.status(401).json({ error: 'Credenciales incorrectas' })
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol } })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { registro, login }