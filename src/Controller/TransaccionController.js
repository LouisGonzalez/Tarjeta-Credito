//va a la instancia de modelo y de sequelize del archivo bd
//params es lo que viene en la URL, body es lo que viene como formulario osea x-www-form-urlenconded
var { Transaccion, Tarjeta } = require('../db');
Tarjeta.hasMany(Transaccion, { foreignKey: 'tarjeta_id' })
Transaccion.belongsTo(Tarjeta, { foreignKey: 'tarjeta_id' })

const listar = async (req, res) => {
    try {
        const transaccion = await Transaccion.findAll();
        return res.status(200).json({ transaccion });
    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};

const buscar = async (req, res) => {
    try {
        //findByPk busca un elemento por la llave primaria de la tabla
        const transaccion = await Transaccion.findByPk(req.params.transaccionId);
        //si devuelve null, es porque no existe ese elemento
        if (transaccion === null) {
            return res.status(500).json({ error: "No se ha encontrado" });
        } else {
            //si nuestra consulta es exitosa devulve el array con el objeto
            return res.status(200).json({ transaccion });
        }

    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};


const guardar = async (req, res) => {
    try {
        Transaccion.sequelize.transaction(function (t) {
            //console.log
            var promises = []
            transaccion = Transaccion.create(req.body, { transaction: t });
            promises.push(transaccion)
            tarjeta = Tarjeta.findOne({ where: { tarjeta_id: req.body.tarjeta_id } }, { transaction: t })
            promises.push(tarjeta)
            return Promise.all(promises)
        }).then(x => {
            Tarjeta.sequelize.transaction(function (t) {
                var promisesActualizar = []
                var aumento = 0, reduccion = 0
                /*x.map(y => {*/
                if (req.body.es_Aumento) {
                    aumento = x[1].dataValues.saldo + req.body.monto
                    console.log('AUMENTO', aumento)
                    acatualizarTarjeta = Tarjeta.update({ saldo: aumento }, { where: { tarjeta_id: req.body.tarjeta_id } })
                    promisesActualizar.push(acatualizarTarjeta)
                } else {
                    reduccion = x[1].dataValues.saldo - req.body.monto
                    console.log('REDUCCION', reduccion)
                    actualizarTarjeta = Tarjeta.update({ saldo: reduccion }, { where: { tarjeta_id: req.body.tarjeta_id } })
                    promisesActualizar.push(actualizarTarjeta)
                }
                return Promise.all(promisesActualizar)
                //})

            }).then(all => {
                return res.status(200).json({ success: "Saldo actualizado" })
            }).catch(error => {
                return res.status(500).send(error.message)
            })
        }).catch(error => {
            return res.status(500).send(error.message)
        })
        /*if (req.body.nombreTransaccion === "") {
            return res.status(500).json({ error: "no puede aceptar campos vacios" });
        } else {
            //si la consulta viene bien con todo lo necesario se crea el nuevo elemento en la tabla
            const transaccion = await Transaccion.create(req.body);

            return res.status(200).json({ transaccion });
        }*/
    } catch (error) {
        //si hubo error se nos despliega un mensaje
        return res.status(500).send(error.message);
    }
}


const actualizarSaldos = async (req, res) => {
    try {
        Tarjeta.sequelize.transaction(function (t) {
            var promises = []
            cuentas = Tarjeta.findAll({
                attributes: ['numero_tarjeta', 'tarjeta_id'],
                include: [{
                    model: Transaccion,
                    required: true
                }]
            }, { transaction: t })

            console.log(cuentas)
            promises.push(cuentas)
            return Promise.all(promises)
        }).then(x => {
            Tarjeta.sequelize.transaction(function (t) {
                //console.log('TODOOOOOOOO', x)
                var promisesActualizar = []
                let saldo = 0
                x.map(y => {

                    //console.log('DATAVALUEEEEEES', y)
                    y.map(z => {
                        //console.log('TARJETAAAAAAAS', z.tarjeta_id)
                        saldo = 0
                        z.Transaccions.map(a => {
                            //console.log('transaccino', a)
                            if (a.es_Aumento)
                                saldo += a.monto
                            else
                                saldo -= a.monto
                        })
                        //console.log('SALDOOOOOOOOOOOOOOOOOOOOOO', saldo)
                        const actualizar = Tarjeta.update({ saldo: saldo }, { where: { tarjeta_id: z.tarjeta_id } },
                            { transaction: t }
                        )
                        promisesActualizar.push(actualizar)

                    })
                    return Promise.all(promisesActualizar)

                })

            }).then(all => {
                return res.status(200).json({ success: "Saldos actualizados" })
            }).catch(error => {
                return res.status(500).send(error.message)
            })
        }).catch(error => {
            return res.status(500).send(error.message)
        })




        /*const cuentas = await Tarjeta.findAll({
            attributes: ['numero_tarjeta'],
            include: [Transaccion]
        })
        let saldo
        cuentas.map(x => {
            saldo = 0
            x.Transaccions.map(y => {
                if (y.es_Aumento)
                    saldo += y.monto
                else
                    saldo -= y.monto
            })
            const actualizar = await Tarjeta.update({
                saldo: saldo
            }, {
                where: { tarjeta_id=x.tarjeta_id }
            }
            )
        })*/
    } catch (error) {
        //si hubo error se nos despliega un mensaje
        return res.status(500).send(error.message);
    }
}

const actualizar = async (req, res) => {
    try {
        //el primer if, pide que exista dentro del body el nombre de la columna.
        if (req.body.nombreTransaccion) {
            //este segundo if le indica que no tiene que venir vacío.
            if (req.body.nombreTransaccion === "") {
                return res.status(500).json({ error: "El campo es obligatorio y no puede ir vacío" });
            } else {
                //si cumple todas las condiciones entonces realiza la actualización.
                await Transaccion.update(req.body, {
                    where: { transaccion_id: req.params.transaccionId }
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
        await Transaccion.destroy({
            where: { transaccion_id: req.params.transaccionId }
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
    buscar,
    actualizarSaldos
}
