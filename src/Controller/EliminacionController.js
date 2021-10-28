//va a la instancia de modelo y de sequelize del archivo bd
//params es lo que viene en la URL, body es lo que viene como formulario osea x-www-form-urlenconded
var { Eliminacion } = require('../Db');

const listar = async (req, res) => {
    try {
        const eliminacion = await Eliminacion.findAll();
        return res.status(200).json({ eliminacion });
    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};

const buscar = async (req, res) => {
    try {
        //findByPk busca un elemento por la llave primaria de la tabla
        const eliminacion = await Eliminacion.findByPk(req.params.eliminacionId);
        //si devuelve null, es porque no existe ese elemento
        if (eliminacion === null) {
            return res.status(500).json({ error: "No se ha encontrado" });
        } else {
            //si nuestra consulta es exitosa devulve el array con el objeto
            return res.status(200).json({ eliminacion });
        }

    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};


const guardar = async (req, res) => {
    try {
        //si la consulta viene bien con todo lo necesario se crea el nuevo elemento en la tabla
        const eliminacion = await Eliminacion.create(req.body);
        return res.status(200).json({ eliminacion });
    } catch (error) {
        //si hubo error se nos despliega un mensaje
        return res.status(500).send(error.message);
    }
}

const actualizar = async (req, res) => {
    try {
        //el primer if, pide que exista dentro del body el nombre de la columna.
        if (req.body.nombreEliminacion) {
            //este segundo if le indica que no tiene que venir vacío.
            if (req.body.nombreEliminacion === "") {
                return res.status(500).json({ error: "El campo es obligatorio y no puede ir vacío" });
            } else {
                //si cumple todas las condiciones entonces realiza la actualización.
                await Eliminacion.update(req.body, {
                    where: { eliminacion_id: req.params.eliminacionId }
                })
                //manda el mensaje de exito.
                return res.status(200).json({ success: "Se ha modificado" });
            }
        }
        //si algo sale mal lo muestra.
        return res.status(500).json({ error: "faltan campos" });

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const eliminar = async (req, res) => {
    try {
        await Eliminacion.destroy({
            where: { eliminacion_id: req.params.eliminacionId }
        }).then(x => {
            //la promeso devulve 1 si la consulta se realiza con exito
            if (x === 1) {
                return res.status(200).json({ success: "Se ha eliminado con exito" });
            } else {
                return res.status(500).json({ error: "No se ha eliminado" });
            }
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
// es necesario exportar todas las funciones
module.exports = {
    listar,
    guardar,
    actualizar,
    eliminar,
    buscar
}
