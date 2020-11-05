//modulos de node
const express = require("express")
const router = express.Router()
//
const Fotos = require("../model/fotos")
const {Usuario} = require("../model/usuario")
const auth = require("../middleware/auth")
const { Mongoose } = require("mongoose")
const cargarArchivo = require("../middleware/file")
//
//registrar act con img
router.post("/cargarArchivo",cargarArchivo.single("sticker"),auth,async(req,res)=>{
  const url = req.protocol+ "://" + req.get("host")
  const usuario = await Usuario.findById(req.usuario._id)
  if (!usuario) {
    return res.status(401).send("no existe el usuario en db")
  }
  let rutaImagen  = null
  if (req.file.filename) {
    rutaImagen = url + "/public/" +req.file.filename
  } else {
    rutaImagen = null
  }
  const fotos = new Fotos({
    idUsuario:usuario._id,
    nombre:req.body.nombre,
    descripcion:req.body.descripcion,
    sticker:rutaImagen,
    estado:req.body.estado
  })
  const result = await fotos.save()
  res.status(200).send(result)
})
//
router.delete('/:_id',auth, async(req,res)=>{
  const usuario = await Usuario.findById(req.body._id)
  if(!usuario) return res.status(401).send("no existe un usuario en bd")
  const fotos = await Fotos.findByIdAndDelete(req.params._id)
  if(!fotos) return res.status(401).send("no hay actividad con ese ID")
  res.status(200).send({message:"actividad eliminada"})
})

module.exports = router