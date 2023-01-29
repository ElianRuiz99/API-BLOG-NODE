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
router.get("/list", ArticleController.listArticles);

module.exports = router;