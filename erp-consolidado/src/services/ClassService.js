/**
 * Serviço de Classes (Módulo Classes)
 */

const ClassRepository = require("../repositories/ClassRepository");

class ClassService {
  async getAllClasses() {
    return await ClassRepository.findAll();
  }

  async getClassById(id) {
    const classData = await ClassRepository.findById(id);
    if (!classData) {
      throw new Error("Classe não encontrada");
    }
    return classData;
  }

  async getClassByName(name) {
    return await ClassRepository.findByName(name);
  }

  async createClass(classData) {
    const { nome, professorId, descricao, comeco, fim } = classData;

    if (!nome || !professorId) {
      throw new Error("Nome e professor são obrigatórios");
    }

    return await ClassRepository.create({
      nome,
      professorId,
      descricao,
      comeco,
      fim,
      createdAt: new Date().toISOString(),
    });
  }

  async updateClass(id, classData) {
    const classObj = await this.getClassById(id);
    return await ClassRepository.update(id, classData);
  }

  async deleteClass(id) {
    const classObj = await this.getClassById(id);
    return await ClassRepository.delete(id);
  }

  async getClassesByTeacher(teacherId) {
    return await ClassRepository.findByTeacher(teacherId);
  }
}

module.exports = new ClassService();
