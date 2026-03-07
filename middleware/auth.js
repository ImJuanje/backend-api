const jwt = require('jsonwebtoken')

const protegerRuta = (req, res, next) => {
  try {
    // Leer el token del header
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'No hay token, acceso denegado' })
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.usuario = decoded // guarda los datos del usuario en la petición
    next() // continúa al controlador
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
}

module.exports = { protegerRuta }