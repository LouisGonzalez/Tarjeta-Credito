'use strict'
    //aqui tambien usamos rutas
    const router = require('express').Router();
    //le pedimos que llame al controlador 
    var EliminacionController = require('../../Controller/EliminacionController');
    
    //este es nuestro listado de rutas para los metodos
    router.get('/', EliminacionController.listar);
    //si recibe id, como en buscar se tiene que especificar
    router.get('/:eliminacionId', EliminacionController.buscar);
    router.post('/', EliminacionController.guardar);
    router.put('/:eliminacionId',  EliminacionController.actualizar);
    router.delete('/:eliminacionId', EliminacionController.eliminar);
    
    
    //porque esta ruta de genero ya tiene ese prefijo, lo indicamos en el api.js de la carpeta de rutas
    //se exportan nuestros métodos del router.
    module.exports=router;