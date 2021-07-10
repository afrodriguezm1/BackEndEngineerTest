var express = require('express')
var router = express.Router()

// Controllers
const { validateToken} = require('../controllers/user.controller')
const { findByCoordenates, getHistoryUser} = require('../controllers/restaurant.controller')

router.get('/', validateToken, findByCoordenates),
router.get('/history', validateToken, getHistoryUser)

module.exports = router