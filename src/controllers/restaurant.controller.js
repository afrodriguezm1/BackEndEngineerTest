const Restaurant = require('../models/restaurantModel')
const History = require('../models/historyModel')
const User = require('../models/userModel')
const axios = require('axios');

// Función para consultar la lista de restaurantes en área
// Parámetros:    latitud: Latitud del centro del circulo de búsqueda
//                longitud: Longitud del centro del circulo de búsqueda
//                radio: Tamaño en metros del radio de búsqueda
module.exports.findByCoordenates = async function(req, res){

   // Validación de paramtros
   const {latitud, longitud, radio} = req.body
   if(!latitud || !longitud || !radio){return res.status(400).json("Los parametros del body no están completos")}

   // Busqueda del usuario de la búsqueda
   const user = await User.findOne({_id: req.userId})

   // Link de consulta en el api de google
   let requi = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitud},${longitud}&radius=${radio}&type=restaurant&key=${process.env.GOOGLE_KEY}`

   // Consultar los restaurantes que están en el rango
   const response = await axios.get(requi)

   if(!response){return res.status(400).json("No hubo ningún resultado")}

   // Recorrido de los restaurantes
   let restaurantes = []
   let resRestaurantes = []
   response.data.results.forEach(rest => {
      let dataRest = {
         name:rest.name,
         address:rest.vicinity,
         latitud: rest.geometry.location.lat,
         longitud: rest.geometry.location.lng,
      }
      let newRestaurante = new Restaurant(dataRest)
      restaurantes.push(newRestaurante)
      resRestaurantes.push(dataRest)

      // Guardado en la base de datos de los restaurantes
      newRestaurante.save()
   })
   
   // Guardado en la base de datos del historial
   let hist = new History({
      latitud: latitud,
      longitud: longitud,
      radio: radio,
      date: new Date(),
      results: restaurantes
   })
   hist.save()

   // Agregar la consulta y actualizar al usuario
   user.history.push(hist)
   user.save()

   // Formateo para el usuario
   let resHistory = {
      "Latitud de la búsqueda": latitud,
      "Longitud de la búsqueda": longitud,
      "Radio de la búsqueda (m)": radio,
      "Numero de resultados": resRestaurantes.length,
      results: resRestaurantes
   }
   return res.status(200).json(resHistory)
}

// Función para consultar el historial de búsquedas de un usuario
// Parámetros:    _id: Id del usuario que se encuentra logueado
module.exports.getHistoryUser = async function(req, res){

   // Consulta del usuario
   const user = await User.findById({_id: req.userId})
      .populate({
         path: "history",
         populate:{
            path: "results"
         }
      })
   if(user.history.length === 0){return res.state(200).json("El usuario aún no tiene consultas")}

   //Formateo para el usuario
   let resRestaurantes = []
   await user.history.forEach(hist => {
      let histTemp = {
         "Latitud de la búsqueda": hist.latitud,
         "Longitud de la búsqueda": hist.longitud,
         "Radio de la búsqueda (m)": hist.radio,
         "Fecha de la consulta" :hist.date,
         "Numero de resultados": []
      }
      // Recorre cada restaurante por historial
      hist.results.forEach(rest => {
         histTemp["Numero de resultados"].push({
            "Nombre":rest.name,
            "Dirección":rest.address,
            "Latitud": rest.latitud,
            "Longitud": rest.longitud,
         })
      })
      resRestaurantes.push(histTemp)
   })

   return res.status(200).json(resRestaurantes)
}