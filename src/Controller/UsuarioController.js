//va a la instancia de modelo y de sequelize del archivo bd
//params es lo que viene en la URL, body es lo que viene como formulario osea x-www-form-urlenconded
var { Usuario } = require('../Db');
const { Sequelize, Op } = require('sequelize')
const jwt = require('jwt-simple')
const nodemailer = require('nodemailer');


const listar = async (req, res) => {
    try {
        const usuario = await Usuario.findAll();
        return res.status(200).json({ usuario });
    } catch (error) {
        //si nuestra consulta falla tira un mensaje de error
        return res.status(500).send(error.message);
    }
};

const buscarDPI = async (req, res) => {
    try {
        //findByPk busca un elemento por la llave primaria de la tabla
        const usuario = await Usuario.findOne(
            {
                where: { dpi: req.params.dpi }
            });
        //si devuelve null, es porque no existe ese elemento
        if (usuario === null) {
            return res.status(500).json({ error: "No se ha encontrado" });
        } else {
            //si nuestra consulta es exitosa devulve el array con el objeto
            return res.status(200).json({ usuario });
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
        if (req.body.nombreUsuario === "") {
            return res.status(500).json({ error: "no puede aceptar campos vacios" });
        } else {
            //si la consulta viene bien con todo lo necesario se crea el nuevo elemento en la tabla
            const usuario = await Usuario.create(req.body);
            return res.status(200).json({ usuario });
        }
    } catch (error) {
        //si hubo error se nos despliega un mensaje
        return res.status(500).send(error.message);
    }
}

const actualizar = async (req, res) => {
    try {
        //el primer if, pide que exista dentro del body el nombre de la columna.
        if (req.body.nombreUsuario) {
            //este segundo if le indica que no tiene que venir vacío.
            if (req.body.nombreUsuario === "") {
                return res.status(500).json({ error: "El campo es obligatorio y no puede ir vacío" });
            } else {
                //si cumple todas las condiciones entonces realiza la actualización.
                await Usuario.update(req.body, {
                    where: { usuario_id: req.params.usuarioId }
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


const login = async (req, res) => {
    try {
        //pide los datos del body del req, va actualizar todos los parametros necesarios
        //necesitan hacer comprobaciones sobre si existe o no en el body. 
        if (req.body.username === "" && req.body.password === "") {
            return res.status(500).json({ error: "Debe ingresar su usuario y PIN" });
        } else {
            //si la consulta viene bien con todo lo necesario se crea el nuevo elemento en la tabla
            const usuario = await Usuario.findOne({ where: { [Op.and]: [{ username: req.body.username }, { password: req.body.password }] } });
            if (usuario) {
                //res.json({ success: createToken(usuario) })
                createToken(usuario, res)
            } else {
                return res.status(500).json({ error: "Usuario o PIN incorrectos" });
            }
            //return res.status(200).json({ usuario });
        }
    } catch (error) {
        //si hubo error se nos despliega un mensaje
        return res.status(500).send(error.message);
    }
}
const createToken = async (user, res) => {
    const payload = {
        usuario_id: user.usuario_id,
        username: user.username,
        admin: user.admin,
        nombre: user.nombre,
    }
    const usuario = {
        usuario_id: user.usuario_id,
        username: user.username,
        admin: user.admin,
        nombre: user.nombre,
    }

    let token = jwt.encode(payload, 'tarjeta')
    return res.status(200).json({ success: token, usuario: usuario })
}

const eliminar = async (req, res) => {
    try {
        await Usuario.destroy({
            where: { usuario_id: req.params.usuarioId }
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
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    auth: {
        user: 'luisestuardo-bolanosgonzalez@cunoc.edu.gt',
        pass: 'dshq glnx pcju jtpk',
    }
});

const sendEmail = async (usuario, res) => {
    //return new Promise((resolve, reject) => {
    //console.log(usuario)
    let mailOptions = {
        //from: usuario.password,
        to: usuario.correo,
        subject: 'RECORDATIRIO DE PIN',
        template: 'verification',
        html: 'Su pin es: <strong>' + usuario.password + '<strong>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            //console.log("err1 ", error);
            return res.status(500).json({ error: error });
        } else {
            return res.status(200).json({ success: "El pin se ha enviado correctamente, revise su correo electronico" });
        }
    })
    //})
}
const enviarPin = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { [Op.or]: [{ username: req.body.username }, { correo: req.body.username }] } });
        if (usuario) {

            sendEmail(usuario, res)
        } else {
            return res.status(500).json({ error: "El usuario o correo no existen" });
        }
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
    buscarDPI,
    login,
    enviarPin,
}
