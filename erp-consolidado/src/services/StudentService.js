/**
 * Serviço de Estudantes (Módulo Classes)
 */

const StudentRepository = require("../repositories/StudentRepository");

class StudentService {
  async getAllStudents() {
    return await StudentRepository.findAll();
  }

  async getStudentById(id) {
    const student = await StudentRepository.findById(id);
    if (!student) {
      throw new Error("Estudante não encontrado");
    }
    return student;
  }

  async getStudentByEmail(email) {
    return await StudentRepository.findByEmail(email);
  }

  async getStudentByRegistration(registration) {
    const student = await StudentRepository.findByRegistration(registration);
    if (!student) {
      throw new Error("Estudante não encontrado");
    }
    return student;
  }

  async createStudent(studentData) {
    const { registration, name, email, phone } = studentData;

    if (!registration || !name || !email || !phone) {
      throw new Error("Matrícula, nome, email e telefone são obrigatórios");
    }

    const existingReg = await StudentRepository.findByRegistration(
      registration
    );
    if (existingReg) {
      throw new Error("Número de matrícula já existe");
    }

    const existingEmail = await StudentRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error("Email já cadastrado");
    }

    return await StudentRepository.create({
      registration,
      name,
      email,
      phone,
    });
  }

  async updateStudent(id, studentData) {
    const student = await this.getStudentById(id);

    if (
      studentData.registration &&
      studentData.registration !== student.registration
    ) {
      const existing = await StudentRepository.findByRegistration(
        studentData.registration
      );
      if (existing) {
        throw new Error("Número de matrícula já existe");
      }
    }

    if (studentData.email && studentData.email !== student.email) {
      const existing = await StudentRepository.findByEmail(studentData.email);
      if (existing) {
        throw new Error("Email já cadastrado");
      }
    }

    return await StudentRepository.update(id, studentData);
  }

  async deleteStudent(id) {
    const student = await this.getStudentById(id);
    return await StudentRepository.delete(id);
  }

  async getStudentClasses(studentId) {
    return await StudentRepository.findByClass(studentId);
  }
}

module.exports = new StudentService();
