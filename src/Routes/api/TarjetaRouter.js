'use strict'
//aqui tambien usamos rutas
const router = require('express').Router();
//le pedimos que llame al controlador 
var TarjetaController = require('../../controller/TarjetaController');

router.get('/generar-datos', TarjetaController.generarDatos);
router.get('/ultimos-movimientos/:fecha', TarjetaController.ultimosMovimientos);
router.get('/bloqueadas', TarjetaController.tarjetasBloqueadas);
router.get('/total', TarjetaController.totalTarjetas);
router.get('/cierre', TarjetaController.cierre);
//este es nuestro listado de rutas para los metodos
router.get('/', TarjetaController.listar);
//si recibe id, como en buscar se tiene que especificar
router.get('/:tarjetaId', TarjetaController.buscar);
router.get('/buscar-tarjetas/:tarjetaId', TarjetaController.buscarTarjetas);
router.post('/', TarjetaController.guardar);
router.put('/:tarjetaId', TarjetaController.actualizar);
router.delete('/:tarjetaId', TarjetaController.eliminar);



//porque esta ruta de genero ya tiene ese prefijo, lo indicamos en el api.js de la carpeta de rutas
//se exportan nuestros métodos del router.
module.exports = router;