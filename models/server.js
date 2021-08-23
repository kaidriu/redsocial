const express = require('express');
const cors = require('cors');

const db = require("../database/db");


class Server{


    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.usuariosPATH='/api/usuarios';
        this.authPATH='/api/auth';


        //middlewares
        this.middlewares();


        //bd
        this.bd();

        //routes
        this.routes();
     
    }
 


    middlewares(){

        //CORS
        this.app.use(cors());

        // Parseo y Lectura del body
        this.app.use(express.json());


        //directorio publico
        this.app.use(express.static('public'));


    }


    routes(){
        
        this.app.use(this.authPATH,require('../routes/auth'));
        this.app.use(this.usuariosPATH,require('../routes/usuarios'));
        

    }


    bd(){
        db.sequelize.sync();
        db.sequelize.sync({ force: true }).then(() => {
        console.log("Elimina y reinicia la db.");
        });
    }


    
    


    listen(){
        
        this.app.listen(this.port,()=>{
            console.log('puerto en lanzado en ', this.port);
        });

    }

}


module.exports=Server;