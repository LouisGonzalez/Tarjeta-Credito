//todas las librarias y paquetes que se requieren
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const puerto = process.env.PORT || 8080
const apiRouter = require('./Routes/api.js')
const cors = require("cors")

const app = express();
require('./Db');



app.use(express.static(__dirname+'/front-end/dist/front-end'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/front-end/dist/front-end/index.html'));
});



const corsOptions = {origin: "https://tarjeta-credito-seminario.herokuapp.com/"}
app.use(cors({
    origin: "https://tarjeta-credito-seminario.herokuapp.com/",
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

app.use(express.static(__dirname + '/front-end'));

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