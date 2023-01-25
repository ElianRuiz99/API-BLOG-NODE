const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

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
app.use(express.json());

// Crear rutas
app.get("/", (req, res) => {

    return res.status(200).send(`
        <h1>Creando API REST con Node.js</h1>
    `)
    
});

app.get("/prueba", (req, res) => {
    console.log("Se ha ejecutado el endpoint /prueba");

    return res.status(200).json({
        curso: 'Master en Node',
        estudiante: "Elian Ruiz",
        fecha: "25/01/2023"
    })
    
});

// Crear Servidor y escuchar peticiones http
app.listen( port, () => {
    console.log(`Servidor Corriendo en el puerto: ${port}`);
});