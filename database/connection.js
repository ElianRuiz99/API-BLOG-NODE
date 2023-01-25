const mongoose = require("mongoose");

const connection = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect("mongodb://127.0.0.1:27017/Blog");

        console.log("La conexion a la Base de datos fue exitoso!");
        
    } catch (err) {
        console.log(err);
        throw new Error("No se a podido conectar a la base de datos");
    }
}

module.exports = {
    connection
}