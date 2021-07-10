const express = require('express')
require('dotenv').config()
const connectDB = require('./database')

// Database
connectDB()

// Imports
const userRoutes = require('./routes/user.routes')
const restaurantRoutes = require('./routes/restaurant.routes')

// Iniliaziación
const app = express()
const port = process.env.APP_PORT || 3000

// Middlewares
app.use(express.json())


// Rutas
app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)   

app.listen(port, () => {
    console.log("Api escuchando en el puerto " + port)
})