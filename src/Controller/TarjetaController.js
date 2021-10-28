//va a la instancia de modelo y de sequelize del archivo bd
//params es lo que viene en la URL, body es lo que viene como formulario osea x-www-form-urlenconded
var { Tarjeta, Usuario, Tipo_cuenta, Moneda, Deshabilitacion, Eliminacion, Transaccion } = require('../db');
const { Sequelize, Op } = require('sequelize')

Usuario.hasMany(Tarjeta, { foreignKey: 'usuario_id' })
Tarjeta.belongsTo(Usuario, { foreignKey: 'usuario_id' })

Tipo_cuenta.hasMany(Tarjeta, { foreignKey: 'tipo_cuenta_id' })
Tarjeta.belongsTo(Tipo_cuenta, { foreignKey: 'tipo_cuenta_id' })

Moneda.hasMany(Tipo_cuenta, { foreignKey: 'moneda_id' })
Tipo_cuenta.belongsTo(Moneda, { foreignKey: 'moneda_id' })

Tarjeta.hasMany(Deshabilitacion, { foreignKey: 'tarjeta_id' })
Deshabilitacion.belongsTo(Tarjeta, { foreignKey: 'tarjeta_id' })

Tarjeta.hasMany(Eliminacion, { foreignKey: 'tarjeta_id' })
Eliminacion.belongsTo(Tarjeta, { foreignKey: 'tarjeta_id' })

Tarjeta.hasMany(Transaccion, { foreignKey: 'tarjeta_id' })
Transaccion.belongsTo(Tarjeta, { foreignKey: 'tarjeta_id' })

const listar = async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findAll({
            attributes: ['tarjeta_id', 'numero_tarjeta', 'cvv', 'fecha_vencimiento', 'notifyme', 'saldo', 'limite'],
            include: [
                Usuario,
                {
                    model: Tipo_cuenta,
                    include: [Moneda]
                },
                Deshabilitacion,
                Eliminacion
            ],
            order: [['tarjeta_id']]
        });
        return res.status(200).json({ tarjeta });
    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};

const buscar = async (req, res) => {
    try {
        //findByPk busca un elemento por la llave primaria de la tabla
        const tarjeta = await Tarjeta.findOne({
            include: [Transaccion,
                {
                    model: Tipo_cuenta,
                    include: [{
                        model: Moneda
                    }]
                },
                Usuario],
            where: { numero_tarjeta: req.params.tarjetaId },
        });
        //si devuelve null, es porque no existe ese elemento
        if (tarjeta === null) {
            return res.status(500).json({ error: "No se ha encontrado" });
        } else {
            //si nuestra consulta es exitosa devulve el array con el objeto
            return res.status(200).json({ tarjeta });
        }

    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};

const buscarTarjetas = async (req, res) => {
    try {
        //findByPk busca un elemento por la llave primaria de la tabla
        const tarjeta = await Tarjeta.findAll({
            include: [Transaccion,
                {
                    model: Tipo_cuenta,
                    include: [{
                        model: Moneda
                    }]
                },
                Usuario
            ],
            where: { usuario_id: req.params.tarjetaId },
            order: [['tarjeta_id']]
        });
        //si devuelve null, es porque no existe ese elemento
        if (tarjeta === null) {
            return res.status(500).json({ error: "No se ha encontrado" });
        } else {
            //si nuestra consulta es exitosa devulve el array con el objeto
            return res.status(200).json({ tarjeta });
        }

    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};

const guardar = async (req, res) => {
    try {
        console.log(req.body)
        const tarjeta = await Tarjeta.create(req.body);
        return res.status(200).json({ tarjeta })

    } catch (error) {
        //si hubo error se nos despliega un mensaje
        return res.status(500).send(error.message);
    }
}

const actualizar = async (req, res) => {
    try {
        //el primer if, pide que exista dentro del body el nombre de la columna.
        if (req.body.nombreTarjeta) {
            //este segundo if le indica que no tiene que venir vacío.
            if (req.body.nombreTarjeta === "") {
                return res.status(500).json({ error: "El campo es obligatorio y no puede ir vacío" });
            } else {
                //si cumple todas las condiciones entonces realiza la actualización.
                await Tarjeta.update(req.body, {
                    where: { tarjeta_id: req.params.tarjetaId }
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
        await Tarjeta.destroy({
            where: { tarjeta_id: req.params.tarjetaId }
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
const generarDatos = async (req, res) => {
    try {
        console.log('generando...')
        const tarjeta = await Tarjeta.findOne({
            attributes: ['numero_tarjeta'],
            limit: 1,
            order: [['tarjeta_id', 'desc']]
        });
        let cvv = Math.random() * (999 - 100) + 100
        cvv = Math.trunc(cvv)
        let datos = {
            numero_tarjeta: tarjeta.numero_tarjeta[1] + tarjeta.numero_tarjeta[2] + tarjeta.numero_tarjeta[3] + tarjeta.numero_tarjeta[4],
            cvv: cvv
        }
        //console.log(datos)
        return res.status(200).json({ datos });
    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};

//reportes
const ultimosMovimientos = async (req, res) => {
    try {
        const movimentos = await Transaccion.findAll({
            include: [{
                attributes: ['numero_tarjeta'],
                model: Tarjeta,
                include: [{
                    attributes: ['nombre'],
                    model: Tipo_cuenta,
                    include: [{
                        attributes: ['simbolo'],
                        model: Moneda
                    }]
                }]

            }],
            where: { fecha: { [Op.gte]: req.params.fecha } }
        });

        //console.log(datos)
        return res.status(200).json({ movimentos });
    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};

const tarjetasBloqueadas = async (req, res) => {
    try {
        const tarjeta = await Deshabilitacion.findAll({
            include: [{
                attributes: ['numero_tarjeta'],
                model: Tarjeta,
                required: true
            }]
        });

        //console.log(datos)
        return res.status(200).json({ tarjeta });
    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};
const totalTarjetas = async (req, res) => {
    try {
        const deshabilitadas = await Tarjeta.findAll({
            attributes: [[Sequelize.fn('count', Sequelize.col('Tarjeta.tarjeta_id')), 'cantidad']],
            include: [{
                attributes: [],
                model: Deshabilitacion,
                required: true
            }]
        });
        const eliminadas = await Tarjeta.findAll({
            attributes: [[Sequelize.fn('count', Sequelize.col('Tarjeta.tarjeta_id')), 'cantidad']],
            include: [{
                attributes: [],
                model: Eliminacion,
                required: true
            }]
        });
        const todas = await Tarjeta.findAll({
            attributes: [[Sequelize.fn('count', Sequelize.col('tarjeta_id')), 'cantidad']],

        });

        //console.log(datos)
        return res.status(200).json({ deshabilitadas, eliminadas, todas });
    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};

const cierre = async (req, res) => {
    try {
        const aumentos = await Moneda.findAll({
            attributes: ['moneda_id', 'nombre', 'simbolo', 'cambio_quetzales', [Sequelize.fn('sum', Sequelize.col('Tipo_cuenta.Tarjeta.Transaccions.monto')), 'cantidad']],
            include: [{
                attributes: [],
                model: Tipo_cuenta,
                required: true,
                include: [{
                    attributes: [],
                    model: Tarjeta,
                    required: true,
                    include: [{
                        attributes: [],
                        model: Transaccion,
                        required: true,
                        where: { es_Aumento: true }
                    }]
                }]
            }],
            group: 'moneda_id'
        });

        const reducciones = await Moneda.findAll({
            attributes: ['moneda_id', 'nombre', 'simbolo', [Sequelize.fn('sum', Sequelize.col('Tipo_cuenta.Tarjeta.Transaccions.monto')), 'cantidad']],
            include: [{
                attributes: [],
                model: Tipo_cuenta,
                required: true,
                include: [{
                    attributes: [],
                    model: Tarjeta,
                    required: true,
                    include: [{
                        attributes: [],
                        model: Transaccion,
                        required: true,
                        where: { es_Aumento: false }
                    }]
                }]
            }],
            group: 'moneda_id'
        });

        //console.log(datos)
        return res.status(200).json({ aumentos, reducciones });
    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};


// es necesario exportar todas las funciones
module.exports = {
    listar,
    guardar,
    actualizar,
    eliminar,
    buscar,
    generarDatos,
    ultimosMovimientos,
    tarjetasBloqueadas,
    totalTarjetas,
    cierre,
    buscarTarjetas,
}
