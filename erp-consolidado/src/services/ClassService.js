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
    const { name, teacherId, description, startDate, endDate } = classData;

    if (!name || !teacherId) {
      throw new Error("Nome e professor são obrigatórios");
    }

    return await ClassRepository.create({
      name,
      teacherId,
      description,
      startDate,
      endDate,
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
