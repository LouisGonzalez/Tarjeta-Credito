//todas las librarias y paquetes que se requieren
const express = require('express');
const bodyParser = require('body-parser');
const puerto = process.env.PORT || 3000
const apiRouter = require('./routes/api')
const cors = require("cors")

const app = express();
require('./db');

app.use(cors())
app.options('*', cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);


app.listen(puerto, () => {
    console.log("Servidor Iniciado en el puerto" + puerto);
});

/*//Base de datos
const sequelize = require('./Db');
const Models = require('./Model/CreateModels');
const { database } = require('./config');

//Servidor
const { createServer } = require('http');
const app = express();
const PORT = process.env.PORT || 3000;
const server = createServer(app);

//para envio de request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
const email = require('./Routes/MailRoutes');
app.use(email);





server.listen(PORT, function () {
    console.log(`la app ha sido arrancada en ${PORT}`);

    //Conexion a la base de datos
    sequelize.query('SET FOREIGN_KEY_CHECKS = 0').then(
        sequelize.sync({ force: false }).then(() => {
            console.log("Conexion establecida");
        }).catch(error => {
            console.log("Se ha producido un error al momento de intentar conectar con la db", error);
        }))
})
*/