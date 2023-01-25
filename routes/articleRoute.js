const express = require('express');
const router = express.Router();

// Cargar el Controlador
const ArticleController = require('../controller/articleController');

// Rutas de Prueba
router.get("/ruta-de-prueba", ArticleController.prueba);
router.get("/curso", ArticleController.curso);


module.exports = router;