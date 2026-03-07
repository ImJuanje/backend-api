const express = require('express')
const app = express()

app.use(express.json())

const leadsRoutes = require('./routes/leads')
app.use('/leads', leadsRoutes)

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})