const express = require('express');
const multer = require("multer");
// Cargar el Controlador
const ArticleController = require('../controller/articleController');

const router = express.Router();

// Configurar almacenamiento ( destino y nombre del archivo )
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './images/articles/');
    },
    filename: function(req, file, cb){
        cb(null, "articulo_" + file.originalname);
    }
})

// unir multer y el almacenamiento
const uploads = multer({storage});

// Rutas de Prueba
router.get("/ruta-de-prueba", ArticleController.prueba);
router.get("/curso", ArticleController.curso);

// Ruta Crear
router.post("/create", ArticleController.create);

// Listar todos los articulos
router.get("/list/:limit?", ArticleController.listArticles);

// Listar un Articulo
router.get("/listOne/:id", ArticleController.listOne);

// Eliminar un Articulo
router.delete("/deleteOne/:id", ArticleController.deleteOne);

// Editar Articulo
router.put("/edit/:id", ArticleController.edit);

// Subir una imagen
router.post("/uploadImg/:id", [uploads.single("file0")], ArticleController.upload);

// Mostrar una imagen
router.get("/showImg/:nameImg", ArticleController.showImg);

// Bucador
router.get("/search/:text", ArticleController.search);

module.exports = router;