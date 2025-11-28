/**
 * Banco de Dados em Memória Consolidado
 * Integra dados de: Cursos, Produtos, Áreas de Conhecimento e Classes
 */

const dataStore = {
  // ===== MÓDULO CURSOS (erp-curso-1) =====
  users: [
    {
      id: 1,
      email: "admin@cursos.com",
      password: "hashed_password_here",
      role: "admin",
      nome: "Administrador",
    },
  ],
  alunos: [],
  professores: [],
  turmas: [],
  matriculas: [],

  // ===== MÓDULO PRODUTOS (erp-curso-2) =====
  products: [],
  clients: [],
  orders: [],
  reports: [],

  // ===== MÓDULO ÁREAS DE CONHECIMENTO (erp-curso-3) =====
  areasDeConhecimento: [
    {
      id: 1,
      nome: "Ciências Exatas e da Terra",
      descricao: "Área que abrange matemática, física, química, etc.",
    },
    {
      id: 2,
      nome: "Ciências Humanas",
      descricao:
        "Área focada no estudo da sociedade, cultura e pensamento humano.",
    },
  ],
  cursos: [],
  disciplinas: [],
  matrizes: [],

  // ===== MÓDULO CLASSES (erp-curso-4) =====
  students: [],
  classes: [],
  lessons: [],
  usersClasses: [],
};

// Contadores para IDs
let nextIds = {
  users: 2,
  alunos: 1,
  professores: 1,
  turmas: 1,
  matriculas: 1,
  products: 1,
  clients: 1,
  orders: 1,
  areasDeConhecimento: 3,
  cursos: 1,
  disciplinas: 1,
  matrizes: 1,
  students: 1,
  classes: 1,
  lessons: 1,
};

class MemoryDB {
  insert(collection, data) {
    if (!dataStore[collection]) {
      throw new Error(`Coleção '${collection}' não existe`);
    }

    const id = nextIds[collection]++;
    const newRecord = { id, ...data };
    dataStore[collection].push(newRecord);
    return newRecord;
  }

  findAll(collection) {
    if (!dataStore[collection]) {
      throw new Error(`Coleção '${collection}' não existe`);
    }
    return dataStore[collection];
  }

  findById(collection, id) {
    if (!dataStore[collection]) {
      throw new Error(`Coleção '${collection}' não existe`);
    }
    return dataStore[collection].find((item) => item.id === parseInt(id));
  }

  findOneBy(collection, key, value) {
    if (!dataStore[collection]) {
      throw new Error(`Coleção '${collection}' não existe`);
    }
    return dataStore[collection].find((item) => item[key] === value);
  }

  findManyBy(collection, key, value) {
    if (!dataStore[collection]) {
      throw new Error(`Coleção '${collection}' não existe`);
    }
    return dataStore[collection].filter((item) => item[key] === value);
  }

  update(collection, id, updates) {
    if (!dataStore[collection]) {
      throw new Error(`Coleção '${collection}' não existe`);
    }

    const index = dataStore[collection].findIndex(
      (item) => item.id === parseInt(id)
    );
    if (index === -1) {
      return null;
    }

    const updatedRecord = {
      ...dataStore[collection][index],
      ...updates,
      id: parseInt(id),
    };
    dataStore[collection][index] = updatedRecord;
    return updatedRecord;
  }

  remove(collection, id) {
    if (!dataStore[collection]) {
      throw new Error(`Coleção '${collection}' não existe`);
    }

    const index = dataStore[collection].findIndex(
      (item) => item.id === parseInt(id)
    );
    if (index === -1) {
      return false;
    }

    dataStore[collection].splice(index, 1);
    return true;
  }

  // Método para resetar o banco (útil para testes)
  reset() {
    Object.keys(dataStore).forEach((key) => {
      dataStore[key] = [];
    });
    nextIds = {
      users: 2,
      alunos: 1,
      professores: 1,
      turmas: 1,
      matriculas: 1,
      products: 1,
      clients: 1,
      orders: 1,
      areasDeConhecimento: 3,
      cursos: 1,
      disciplinas: 1,
      matrizes: 1,
      students: 1,
      classes: 1,
      lessons: 1,
    };
  }
}

module.exports = new MemoryDB();
