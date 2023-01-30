const Article = require("../models/Article");
const { validarDatos } = require("../helpers/validarDatos");
const fs = require("fs");
const path = require("path");

// Inicio de metodos de prueba
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
// Fin de metodos de prueba

const create = (req, res) => {
    // 1.Recoger Parametros
    let params = req.body;

    // 2.Validar datos
    try {
        validarDatos(params);
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
        if (err || !saveArticle) {
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

const listArticles = (req, res) => {
    let query = Article.find({});

    if (req.params.limit && req.params.limit > 0) {
        query.limit(req.params.limit);
    }

    query.sort({ date: -1 })
        .exec((err, articles) => {
            if (err || !articles) {
                return res.status(404).json({
                    status: "error",
                    mensaje: "No se han encontrado articulos"
                });
            }

            return res.status(200).json({
                status: "Success",
                menssage: "Listar Articulos",
                parametro: req.params.limit,
                articles: articles
            });
        })
}

const listOne = (req, res) => {
    let id = req.params.id;

    Article.findById(id, (err, article) => {
        // Si no existe
        if (err || !article) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontro el Articulo"
            });
        }

        // Si exite
        return res.status(200).json({
            status: "Success",
            menssage: "Articulo Encontrado",
            article
        });
    });
}

const deleteOne = (req, res) => {
    let articleId = req.params.id;

    Article.findOneAndDelete({ _id: articleId }, (err, articleDelete) => {
        if (err || !articleDelete) {
            return res.status(500).json({
                status: "Error",
                message: "El articulo No se Elimino"
            });
        }

        return res.status(200).json({
            status: "Success",
            menssage: "Articulo eliminado exitosamente",
            articleDelete
        });
    });
}

const edit = (req, res) => {
    // Tomar id del articulo a eliminar
    let articleId = req.params.id;

    // Tomar datos del body
    let newParams = req.body;

    // Validar datos
    try {
        validarDatos(newParams);
    } catch (err) {
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    // Buscar y actualizar articulo
    Article.findOneAndUpdate({ _id: articleId }, newParams, { new: true }, (err, newArticle) => {
        // Devolver una respuesta 
        if (err || !newArticle) {
            return res.status(500).json({
                status: "Error",
                message: "Error al actualizar el articulo"
            });
        }

        return res.status(200).json({
            status: "Success",
            menssage: "Articulo actualizado",
            article: newArticle
        });
    });
}

const upload = (req, res) => {
    // Configurar multer
    // esto se realiza desde el route

    // Recoger el fichero de imagen subido
    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "Error",
            message: "Peticion Invalida"
        });
    }

    // Nombre del archivo 
    let fileName = req.file.originalname;

    // Extencion del archivo
    let fileSplit = fileName.split("\.");
    console.log(fileSplit);
    let extenFile = fileSplit[1];

    // Comprobar extencion 
    if (extenFile != "jpg" && extenFile != "png" && extenFile != "jpeg" && extenFile != "gif") {
        // Borrar Archivo
        fs.unlink(req.file.path, (err) => {
            return res.status(400).json({
                status: "Error",
                message: "Imagen invalida"
            });
        });
    } else {
        // Tomar id del articulo a eliminar
        let articleId = req.params.id;

        // Buscar y actualizar articulo
        Article.findOneAndUpdate({ _id: articleId }, {picture: req.file.filename}, { new: true }, (err, newArticle) => {
            // Devolver una respuesta 
            if (err || !newArticle) {
                return res.status(500).json({
                    status: "Error",
                    message: "Error al actualizar el articulo"
                });
            }

            return res.status(200).json({
                status: "Success",
                menssage: "Articulo actualizado",
                extenFile,
                article: newArticle,
                file: req.file
            });
        });
    }
}

const showImg = (req, res) => {
    let nameImg = req.params.nameImg;
    let ruteImg = "./images/articles/"+ nameImg;

    fs.stat(ruteImg, (err, exist) => {
        if(exist){
            return res.sendFile(path.resolve(ruteImg));
        }else{
            return res.status(404).json({
                status: "Error",
                message: "La imagen no Existe"
            });
        }
    })
}

module.exports = {
    prueba,
    curso,
    create,
    listArticles,
    listOne,
    deleteOne,
    edit,
    upload,
    showImg,
}