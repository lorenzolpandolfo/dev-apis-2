/**
 * Rotas de Disciplinas
 */

const express = require("express");
const router = express.Router();
const DisciplinaController = require("../controllers/DisciplinaController");

router.get("/", DisciplinaController.getAll);
router.get("/:id", DisciplinaController.getById);
router.get("/semestre/:semestre", DisciplinaController.getBySemestre);
router.post("/", DisciplinaController.create);
router.put("/:id", DisciplinaController.update);
router.delete("/:id", DisciplinaController.delete);

module.exports = router;
