
const {response}=require('express');
const bcrypts=require('bcryptjs');
const db = require('../database/db');

const User = db.user;
const Profile = db.profile;

const getUsuarios = async (req,res=response)=>{

   const usuarios = await User.findAndCountAll({
    attributes: {exclude: ['password']}
   });
    
    res.json({
        usuarios
    })

    
}

const getUsuario = async (req,res=response)=>{

    const {id} = req.params;

    const usuario = await User.findByPk(id);
     if(!usuario){
         res.status(404).json({
             msg:`No exite el usuario con el id : ${id}`
         })
     }
     res.json({
         usuario
     })
 }





const usuariosPost = async (req,res=response)=>{

    try {
            
        const {name,lastname,email,password} =req.body;
        
        const usuario = new User({name,lastname,email,password});

        //encriptar contraseña
        const salt = bcrypts.genSaltSync();
        usuario.password = await bcrypts.hash(password,salt);

        //guardar en bd
        await usuario.save();

        userId=usuario.id;

        const profile = new Profile({userId});
        await profile.save();

        const usuariof = await User.findOne({
            where: {email},
            attributes: {exclude: ['password']}
        });

        res.json(usuariof)
        
    } catch (error) {   
        console.log(error);
        res.status(500).json({
            msg: `Hable con el administrador`
        })
        
    }


}

const usuariosPut = async (req,res=response)=>{
    
    const {body} =req;


    //Validar la base de datos

    if(body.password){
        const salt = bcrypts.genSaltSync();
        body.password = await bcrypts.hash(body.password,salt);
    }

    await usuario.update(body);

    res.json({
      
        body
    })


}


const deleteUsuario = async (req,res=response)=>{
    
    const {id} = req.params;
     
    const usuario = await User.findByPk(id);
     if(!usuario){
         res.status(404).json({
             msg:`No exite el usuario con el id : ${id}`
         })
     }
    const usuarioAuthenticado = req.usuario;
    //eliminacion fisica
    await usuario.destroy();
    //const uid = req.uid; 
    //eliminacionn logica
    // await usuario.update({estado=0});

     res.json({
         usuario,
         usuarioAuthenticado
     })
 }






module.exports={
    getUsuario,
    getUsuarios,
    usuariosPost,
    usuariosPut,
    deleteUsuario
}