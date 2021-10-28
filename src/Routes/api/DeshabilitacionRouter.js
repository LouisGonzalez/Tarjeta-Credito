'use strict'
    //aqui tambien usamos rutas
    const router = require('express').Router();
    //le pedimos que llame al controlador 
    var DeshabilitacionController = require('../../controller/DeshabilitacionController');
    
    //este es nuestro listado de rutas para los metodos
    router.get('/', DeshabilitacionController.listar);
    //si recibe id, como en buscar se tiene que especificar
    router.get('/:deshabilitacionId', DeshabilitacionController.buscar);
    router.post('/', DeshabilitacionController.guardar);
    router.put('/:deshabilitacionId',  DeshabilitacionController.actualizar);
    router.delete('/:deshabilitacionId', DeshabilitacionController.eliminar);
    
    
    //porque esta ruta de genero ya tiene ese prefijo, lo indicamos en el api.js de la carpeta de rutas
    //se exportan nuestros métodos del router.
    module.exports=router;