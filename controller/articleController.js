const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: "Soy una Accion de prueba en el controller"
    });
}

const curso = (req, res) => {
    console.log("Se ha ejecutado el endpoint /prueba");

    return res.status(200).json({
        curso: 'Master en Node',
        estudiante: "Elian Ruiz",
        fecha: "25/01/2023"
    });
    
}

const create = (req, res) => {

    // 1.Recoger Parametros
    // 2.Validar datos
    // 3.Crear objeto a guardar
    // 4.Asignar valores al modelo(Manual o Aoutomatico)
    // 5.Guardar articulo en la base de datos
    // 7.Devolver el resultado
    return res.status(200).json({
        mensaje: "Accion de guardar"
    });
}

module.exports = {
    prueba,
    curso,
    create
}