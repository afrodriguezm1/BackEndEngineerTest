const mongoose = require('mongoose')

const connectDB = async () => {
    try{

        // Conección a la base de datos
        const conn = await mongoose.connect(process.env.DATABASE_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log(`Base de datos conectada ${conn.connection.host}`)
    }
    catch(err){
        console.err(err)
        procces.exit(1)
    }
}

module.exports = connectDB;
