/**
 * Serviço de Matrizes Curriculares
 */

const MatrizCurricularRepository = require("../repositories/MatrizCurricularRepository");
const MatrizCurricularDisciplinaRepository = require("../repositories/MatrizCurricularDisciplinaRepository");
const CursoRepository = require("../repositories/CursoRepository");
const DisciplinaRepository = require("../repositories/DisciplinaRepository");

class MatrizCurricularService {
  async getAllMatrizes() {
    return await MatrizCurricularRepository.findAllWithCurso();
  }

  async getMatrizById(id) {
    const matriz = await MatrizCurricularRepository.findByIdWithDisciplinas(id);
    if (!matriz) {
      throw new Error("Matriz curricular não encontrada");
    }
    return this._formatMatrizWithDisciplinas(matriz);
  }

  async getMatrizesByCurso(cursoId) {
    const curso = await CursoRepository.findById(cursoId);
    if (!curso) {
      throw new Error("Curso não encontrado");
    }
    const matrizes = await MatrizCurricularRepository.findByCursoId(cursoId);
    return matrizes;
  }

  async createMatriz(matrizData) {
    const { cursoId, ano, disciplinas } = matrizData;

    if (!cursoId || !ano) {
      throw new Error("Curso e ano são obrigatórios");
    }

    const curso = await CursoRepository.findById(cursoId);
    if (!curso) {
      throw new Error("Curso não encontrado");
    }

    const existingMatriz = await MatrizCurricularRepository.findByCursoAndAno(
      cursoId,
      ano
    );
    if (existingMatriz) {
      throw new Error(
        "Já existe uma matriz curricular para este curso no ano informado"
      );
    }

    if (ano <= 0) {
      throw new Error("Ano deve ser maior que zero");
    }

    // Validar se todas as disciplinas existem e se a soma da carga horária é igual a do curso
    if (disciplinas && Array.isArray(disciplinas) && disciplinas.length > 0) {
      let totalCargaHoraria = 0;

      for (const disciplinaId of disciplinas) {
        const disciplina = await DisciplinaRepository.findById(disciplinaId);
        if (!disciplina) {
          throw new Error(`Disciplina com ID ${disciplinaId} não encontrada`);
        }
        totalCargaHoraria += disciplina.cargaHoraria;
      }

      if (totalCargaHoraria !== curso.cargaHoraria) {
        throw new Error(
          `Soma da carga horária das disciplinas (${totalCargaHoraria}h) não corresponde à carga horária do curso (${curso.cargaHoraria}h)`
        );
      }

      // Criar matriz e associar disciplinas
      const matriz = await MatrizCurricularRepository.create({
        cursoId,
        ano,
      });

      for (const disciplinaId of disciplinas) {
        await MatrizCurricularDisciplinaRepository.create({
          matrizCurricularId: matriz.id,
          disciplinaId,
        });
      }

      return await MatrizCurricularRepository.findByIdWithDisciplinas(
        matriz.id
      );
    }

    return await MatrizCurricularRepository.create({
      cursoId,
      ano,
    });
  }

  async addDisciplinaToMatriz(matrizId, disciplinaId) {
    const matriz = await MatrizCurricularRepository.findById(matrizId);
    if (!matriz) {
      throw new Error("Matriz curricular não encontrada");
    }

    const disciplina = await DisciplinaRepository.findById(disciplinaId);
    if (!disciplina) {
      throw new Error("Disciplina não encontrada");
    }

    const existing =
      await MatrizCurricularDisciplinaRepository.findByMatrizAndDisciplina(
        matrizId,
        disciplinaId
      );
    if (existing) {
      throw new Error("Esta disciplina já está associada a esta matriz");
    }

    // Validar nova soma de carga horária
    const curso = await CursoRepository.findById(matriz.cursoId);
    const disciplinasDaMatriz =
      await MatrizCurricularDisciplinaRepository.findByMatrizId(matrizId);

    let totalCargaHoraria = 0;
    for (const d of disciplinasDaMatriz) {
      totalCargaHoraria += d.Disciplina.cargaHoraria;
    }
    totalCargaHoraria += disciplina.cargaHoraria;

    if (totalCargaHoraria > curso.cargaHoraria) {
      throw new Error(
        `Adicionar esta disciplina excederia a carga horária do curso. Total seria ${totalCargaHoraria}h, máximo é ${curso.cargaHoraria}h`
      );
    }

    return await MatrizCurricularDisciplinaRepository.create({
      matrizCurricularId: matrizId,
      disciplinaId,
    });
  }

  async removeDisciplinaFromMatriz(matrizId, disciplinaId) {
    const existing =
      await MatrizCurricularDisciplinaRepository.findByMatrizAndDisciplina(
        matrizId,
        disciplinaId
      );
    if (!existing) {
      throw new Error("Disciplina não encontrada nesta matriz");
    }

    const deleted = await MatrizCurricularDisciplinaRepository.delete(
      existing.id
    );

    if (!deleted) {
      throw new Error("Erro ao remover disciplina da matriz");
    }

    return { message: "Disciplina removida com sucesso" };
  }

  async updateMatriz(id, matrizData) {
    const matriz = await MatrizCurricularRepository.findById(id);
    if (!matriz) {
      throw new Error("Matriz curricular não encontrada");
    }

    if (matrizData.ano && matrizData.ano <= 0) {
      throw new Error("Ano deve ser maior que zero");
    }

    return await MatrizCurricularRepository.update(id, matrizData);
  }

  async deleteMatriz(id) {
    const matriz = await MatrizCurricularRepository.findById(id);
    if (!matriz) {
      throw new Error("Matriz curricular não encontrada");
    }

    // Remover todas as disciplinas associadas
    await MatrizCurricularDisciplinaRepository.deleteByMatrizId(id);

    const deleted = await MatrizCurricularRepository.delete(id);

    if (!deleted) {
      throw new Error("Erro ao deletar matriz curricular");
    }

    return { message: "Matriz curricular deletada com sucesso" };
  }

  _formatMatrizWithDisciplinas(matriz) {
    if (!matriz) return null;

    const disciplinas = matriz.MatrizCurricularDisciplinas
      ? matriz.MatrizCurricularDisciplinas.map((item) => item.Disciplina).sort(
          (a, b) => a.semestre - b.semestre
        )
      : [];

    return {
      id: matriz.id,
      ano: matriz.ano,
      curso: matriz.Curso,
      disciplinas,
      createdAt: matriz.createdAt,
      updatedAt: matriz.updatedAt,
    };
  }
}

module.exports = new MatrizCurricularService();
