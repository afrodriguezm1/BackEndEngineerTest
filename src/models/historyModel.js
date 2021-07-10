const mongoose = require('mongoose');

const HistoryModel = mongoose.Schema({
    latitud: {
        type: Number,
        require: true
    },
    longitud: {
        type: Number,
        require: true
    },
    radio:{
        type:Number,
        require: true
    },
    date:{
        type: Date,
        require: true
    },
    results:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurants'
        }
    ]
})
module.exports = mongoose.model('Histories', HistoryModel)