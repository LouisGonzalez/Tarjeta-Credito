//va a la instancia de modelo y de sequelize del archivo bd
//params es lo que viene en la URL, body es lo que viene como formulario osea x-www-form-urlenconded
var { Tipo_cuenta, Moneda } = require('../Db');

Moneda.hasMany(Tipo_cuenta, { foreignKey: 'moneda_id' })
Tipo_cuenta.belongsTo(Moneda, { foreignKey: 'moneda_id' })

const listar = async (req, res) => {
    try {
        const tipo_cuenta = await Tipo_cuenta.findAll({ include: [Moneda] });
        return res.status(200).json({ tipo_cuenta });
    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};

const buscar = async (req, res) => {
    try {
        //findByPk busca un elemento por la llave primaria de la tabla
        const tipo_cuenta = await Tipo_cuenta.findByPk(req.params.tipo_cuentaId);
        //si devuelve null, es porque no existe ese elemento
        if (tipo_cuenta === null) {
            return res.status(500).json({ error: "No se ha encontrado" });
        } else {
            //si nuestra consulta es exitosa devulve el array con el objeto
            return res.status(200).json({ tipo_cuenta });
        }

    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};


const guardar = async (req, res) => {
    try {
        //pide los datos del body del req, va actualizar todos los parametros necesarios
        //necesitan hacer comprobaciones sobre si existe o no en el body. 
        if (req.body.nombreTipo_cuenta === "") {
            return res.status(500).json({ error: "no puede aceptar campos vacios" });
        } else {
            //si la consulta viene bien con todo lo necesario se crea el nuevo elemento en la tabla
            const tipo_cuenta = await Tipo_cuenta.create(req.body);
            return res.status(200).json({ tipo_cuenta });
        }
    } catch (error) {
        //si hubo error se nos despliega un mensaje
        return res.status(500).send(error.message);
    }
}

const actualizar = async (req, res) => {
    try {
        //el primer if, pide que exista dentro del body el nombre de la columna.
        if (req.body.nombreTipo_cuenta) {
            //este segundo if le indica que no tiene que venir vacío.
            if (req.body.nombreTipo_cuenta === "") {
                return res.status(500).json({ error: "El campo es obligatorio y no puede ir vacío" });
            } else {
                //si cumple todas las condiciones entonces realiza la actualización.
                await Tipo_cuenta.update(req.body, {
                    where: { tipo_cuenta_id: req.params.tipo_cuentaId }
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
        await Tipo_cuenta.destroy({
            where: { tipo_cuenta_id: req.params.tipo_cuentaId }
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
