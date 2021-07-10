const mongoose = require('mongoose');

const RestaurantModel = mongoose.Schema({
    latitud:{
        type: Number,
        require: true
    },
    longitud:{
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Restaurants', RestaurantModel)