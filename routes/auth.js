const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.post('/login',[
    check('email','debe ingresar el email').isEmail(),
    check('password','debe ingresar el password').notEmpty(),
    validarCampos

],login);



module.exports=router;