const {Router} = require('express');
const { check } = require('express-validator');
const {  usuariosPost, usuariosPut, getUsuario, getUsuarios, deleteUsuario } = require('../controllers/usuarios');

const { validarEmail, encontrarUsuario } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();


router.get('/:id',getUsuario);


router.post('/registrar', 

[
    check('name','El nombre debe ser obligatorio').not().isEmpty(),
    check('password','El password debe contener mas de 6 caracteres,letra mayuscula, minuscula y numeros').isLength({min:6}).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
    check('email','No cumple los parametros del correo').isEmail(),
    check('email').custom(validarEmail),
    validarCampos
]
,usuariosPost);

router.get('/',getUsuarios);


router.delete('/:id',[
    validarJWT,
    validarCampos
],deleteUsuario);

router.put('/:id',
[
    check('id','No es un id valid').isInt(),
    check('id').custom(encontrarUsuario),
    check('email','No cumple los parametros del correo').isEmail(),
    validarCampos
]
,usuariosPut);

 

module.exports=router;