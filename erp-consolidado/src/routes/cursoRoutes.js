/**
 * Rotas de Cursos
 */

const express = require("express");
const router = express.Router();
const CursoController = require("../controllers/CursoController");

router.get("/", CursoController.getAll);
router.get("/:id", CursoController.getById);
router.post("/", CursoController.create);
router.put("/:id", CursoController.update);
router.delete("/:id", CursoController.delete);

module.exports = router;
