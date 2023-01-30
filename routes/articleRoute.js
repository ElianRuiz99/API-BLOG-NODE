const express = require('express');
const router = express.Router();

// Cargar el Controlador
const ArticleController = require('../controller/articleController');

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

module.exports = router;