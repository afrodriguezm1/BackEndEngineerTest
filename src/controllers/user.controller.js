const jwt = require('jsonwebtoken')
const crypt = require('bcryptjs')
const User = require('../models/userModel')

// Función para registrarse como un nuevo usuario
// Parámetros:  username: Nombre de usuario del nuevo usuario
//          password: Contraseña del nuevo usuario
module.exports.signUp = async function(req, res){

    //Validación de parámetros
    const {username, password} = req.body
    if(!username || !password){return res.status(400).json('Body vacio')}

    // Validación de usuario
    const user = await User.findOne({username: username})
    if(user){ return res.status(400).json('El usuario con ese nombre ya existe')}

    // Encriptado de contraseña
    const salt = await crypt.genSalt(10)
    const encryptedPassword = await crypt.hash(password, salt)

    // Creación de usuario
    const newUser = new User({
        username: username,
        password: encryptedPassword
    })
    newUser.save()

    // Creación de token
    const token = jwt.sign({_id: newUser._id}, process.env.TOKEN_SECRET, {expiresIn: 60*30})    
    
    return res.status(201).header('auth-token', token).json('El usuario se creó exitosamente')
}

// Función para iniciar sesión como un usuario
// Parámetros:  username: Nombre de usuario del nuevo usuario
//          password: Contraseña del nuevo usuario
module.exports.signIn = async function(req, res){

    //Validación de parámetros
    const {username, password} = req.body
    if(!username || !password){return res.status(400).json('Body vacio')}

    // Validación de nombre de usuario
    const user = await User.findOne({username: username})
    if(!user){ return res.status(400).json('El usuario con ese nombre no existe')}
    
    // Encriptado de contraseña
    const salt = await crypt.genSalt(10)
    const encryptedPassword = await crypt.hash(password, salt)
    
    // Verificación de contraseña de usuario
    if(await crypt.compare(encryptedPassword, user.password)){return res.status(400).json("Las contraseñas no coinciden")}

    // Creación de token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: 60*30})    
    
    return res.status(200).header('auth-token', token).json('El usuario inició sesión exitosamente')
}

// Función para validar token de autenticación
// Header:  auth-token: Token de autenticación del usuario
module.exports.validateToken = async function(req, res, next){
    try{
        // Extracción del token de autenticación
        const token = req.header('auth-token')

        //Validación del token de autenticación
        if(!token){return res.status(401).json("Acceso denegado")}

        // Guarda el payload
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userId = payload._id

        //Continua
        next()
    }
    catch(e){
        return res.status(400).json('Token de autenticación inválido' )
    }
}


