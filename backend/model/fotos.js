const mongoose = require('mongoose')
const esquemaFotos = new mongoose.Schema({
  idUsuario: String,
  nombre: String,
  descripcion: String,
  sticker: String,
  estado:String,
  fecha:{
    type:Date,
    default: Date.now
  }
})
//Creamos los exports
const Fotos = mongoose.model("fotos", esquemaFotos)
module.exports = Fotos