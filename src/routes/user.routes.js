var express = require('express')
var router = express.Router()

// Controllers
const { signUp, 
    signIn, 
    validateToken} = require('../controllers/user.controller')

    //Rutas
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/signout', signIn)

module.exports = router