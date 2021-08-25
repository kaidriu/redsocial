const { response } = require("express");
const bcrypts = require('bcryptjs');
const db = require('../database/db');
const { generarJWT } = require("../helpers/generarJWT");
const User = db.user;


const login=async (req,res=response)=>{

    const{email,password}=req.body;

    try {

        //verificar si existe el email

        const usuario = await User.findOne({
            where: {email}  
        });
        
        if(!usuario){
            return res.status(400).json({
                msg:`No existe un usuario con ese email : ${email}`
            })
        }

        //si existe el usuario

        //verificar la contraseña

        const validarPassword = bcrypts.compareSync(password,usuario.password);

        if(!validarPassword){
            return res.status(400).json({
                msg:`El passsword esta mal : ${password}`
            })
        }


        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }   

}

module.exports={
    login
}