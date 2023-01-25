const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una Accion de prueba en el controller"
    })
}

const curso = (req, res) => {
    console.log("Se ha ejecutado el endpoint /prueba");

    return res.status(200).json({
        curso: 'Master en Node',
        estudiante: "Elian Ruiz",
        fecha: "25/01/2023"
    })
    
}

module.exports = {
    prueba,
    curso
}