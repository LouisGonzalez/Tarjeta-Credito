'use strict'
//aqui tambien usamos rutas
const router = require('express').Router();
//le pedimos que llame al controlador 
var UsuarioController = require('../../Controller/UsuarioController');

//este es nuestro listado de rutas para los metodos
router.post('/login', UsuarioController.login);
router.post('/enviar-pin', UsuarioController.enviarPin);
router.get('/', UsuarioController.listar);
//si recibe id, como en buscar se tiene que especificar
router.get('/dpi/:dpi', UsuarioController.buscarDPI);
router.post('/', UsuarioController.guardar);
router.put('/:usuarioId', UsuarioController.actualizar);
router.delete('/:usuarioId', UsuarioController.eliminar);


//porque esta ruta de genero ya tiene ese prefijo, lo indicamos en el api.js de la carpeta de rutas
//se exportan nuestros métodos del router.
module.exports = router;