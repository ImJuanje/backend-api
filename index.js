const dotenv = require('dotenv')
dotenv.config() 
console.log('URI:', process.env.MONGODB_URI) 
const express = require('express')
const mongoose = require('mongoose')



const app = express()
app.use(express.json())

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.log('❌ Error conectando a MongoDB:', err))



const leadsRoutes = require('./routes/leads')
app.use('/leads', leadsRoutes)
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})