const validator = require('validator');
const Article = require("../models/Article");

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
    let params = req.body;

    // 2.Validar datos
    try {
        let validateTitle = !validator.isEmpty(params.title) && validator.isLength(params.title, {min: 5, max: undefined});
        let validateContent = !validator.isEmpty(params.content);

        if(!validateContent || !validateTitle){
            throw new Error("NO se ha validado la informacion")
        }

    } catch (err) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    // 3.Crear objeto a guardar
    const article = new Article(params);

    // 4.Asignar valores al modelo(Manual o Automatico)
    // Manual
    // article.title = params.title;
    // Automatico: Agregar new Article(params);

    // 5.Guardar articulo en la base de datos
    article.save((err, saveArticle) => {
        if( err || !saveArticle){
            return res.status(400).json({
                status: "error",
                mensaje: "No se ha guardado el articulo"
            });
        }

        // 7.Devolver el resultado
        return res.status(200).json({
            status: "Success",
            article: saveArticle,
            menssage: "Accion de guardar",
        });
    });

}

module.exports = {
    prueba,
    curso,
    create
}