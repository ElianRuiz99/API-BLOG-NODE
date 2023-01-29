const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

const articleRoute = require('./routes/articleRoute');

// Inicializacion de la app
console.log('Aplicacion de Node esta Funcionando!');

// Conectar a la Base de Datos
connection();

// Crear Servidor de Node
const app = express();
const port = 3900;

// Configuracion de CORS
app.use(cors());

// Convertir Body a objeto js
app.use(express.json()); // Recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); // Recibir datos por form-urlencoded

// Cargar Rutas
app.use('/api', articleRoute);

// Crear rutas
app.get("/", (req, res) => {

    return res.status(200).send(`
        <h1>Creando API REST con Node.js</h1>
    `)
    
});

// Crear Servidor y escuchar peticiones http
app.listen( port, () => {
    console.log(`Servidor Corriendo en el puerto: ${port}`);
});