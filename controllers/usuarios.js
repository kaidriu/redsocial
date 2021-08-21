
const {response}=require('express');
const bcrypts=require('bcryptjs');
const db = require('../database/db');
const User = db.user;


const usuariosGet = (req,res=response)=>{

    const query = req.query;
    
    res.json({
        msg: "Hola get controlador",
        query
    })
}

const usuariosPost = async (req,res=response)=>{
    
    const {name,lastname,email,password} =req.body;
    const usuario = new User({name,lastname,email,password});
    
    //verificar correo existente

    //encriptar contraseña

    //guardar en bd
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = (req,res=response)=>{
    
    const id =req.params.id;

    res.json({
        msg: "Hola put controlador",
        id
    })
}




module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut
}