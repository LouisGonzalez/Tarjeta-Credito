'use strict'
//aqui tambien usamos rutas
const router = require('express').Router();
//le pedimos que llame al controlador 
var TransaccionController = require('../../controller/TransaccionController');

//este es nuestro listado de rutas para los metodos
router.get('/actualizar-saldos', TransaccionController.actualizarSaldos);
router.get('/', TransaccionController.listar);
//si recibe id, como en buscar se tiene que especificar
router.get('/:transaccionId', TransaccionController.buscar);
router.post('/', TransaccionController.guardar);
router.put('/:transaccionId', TransaccionController.actualizar);
router.delete('/:transaccionId', TransaccionController.eliminar);


//porque esta ruta de genero ya tiene ese prefijo, lo indicamos en el api.js de la carpeta de rutas
//se exportan nuestros métodos del router.
module.exports = router;