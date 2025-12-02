/**
 * Rotas de Matrizes Curriculares
 */

const express = require("express");
const router = express.Router();
const MatrizCurricularController = require("../controllers/MatrizCurricularController");

router.get("/", MatrizCurricularController.getAll);
router.get("/:id", MatrizCurricularController.getById);
router.get("/curso/:cursoId", MatrizCurricularController.getByCurso);
router.post("/", MatrizCurricularController.create);
router.post("/disciplina/add", MatrizCurricularController.addDisciplina);
router.delete(
  "/:matrizId/disciplina/:disciplinaId",
  MatrizCurricularController.removeDisciplina,
);
router.put("/:id", MatrizCurricularController.update);
router.delete("/:id", MatrizCurricularController.delete);

module.exports = router;
