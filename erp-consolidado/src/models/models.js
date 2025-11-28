const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Users (autenticação)
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "professor", "student"),
      defaultValue: "user",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// Áreas de Conhecimento
const AreaDeConhecimento = sequelize.define(
  "AreaDeConhecimento",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "areas_de_conhecimento",
    timestamps: true,
  }
);

// Professores
const Professor = sequelize.define(
  "Professor",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
    },
    areaDeConhecimentoId: {
      type: DataTypes.UUID,
      references: {
        model: "areas_de_conhecimento",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "professores",
    timestamps: true,
  }
);

// Turmas
const Turma = sequelize.define(
  "Turma",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    professorId: {
      type: DataTypes.UUID,
      references: {
        model: "professores",
        key: "id",
      },
    },
    areaDeConhecimentoId: {
      type: DataTypes.UUID,
      references: {
        model: "areas_de_conhecimento",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "turmas",
    timestamps: true,
  }
);

// Alunos
const Aluno = sequelize.define(
  "Aluno",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
    },
    endereco: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "alunos",
    timestamps: true,
  }
);

// Matrículas
const Matricula = sequelize.define(
  "Matricula",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    alunoId: {
      type: DataTypes.UUID,
      references: {
        model: "alunos",
        key: "id",
      },
    },
    turmaId: {
      type: DataTypes.UUID,
      references: {
        model: "turmas",
        key: "id",
      },
    },
    dataMatricula: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("ativa", "concluida", "cancelada"),
      defaultValue: "ativa",
    },
    nota: {
      type: DataTypes.FLOAT,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "matriculas",
    timestamps: true,
  }
);

// Produtos
const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estoque: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

// Clientes
const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    razaoSocial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomeFantasia: {
      type: DataTypes.STRING,
    },
    cnpj: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    telefone: {
      type: DataTypes.STRING,
    },
    endereco: {
      type: DataTypes.TEXT,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "clients",
    timestamps: true,
  }
);

// Pedidos
const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    numero: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    clienteId: {
      type: DataTypes.UUID,
      references: {
        model: "clients",
        key: "id",
      },
    },
    dataPedido: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("pendente", "processando", "entregue", "cancelado"),
      defaultValue: "pendente",
    },
    valorTotal: {
      type: DataTypes.DECIMAL(10, 2),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

// Estudantes (Classes module)
const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    dataNascimento: {
      type: DataTypes.DATE,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "students",
    timestamps: true,
  }
);

// Classes
const Class = sequelize.define(
  "Class",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    professorId: {
      type: DataTypes.UUID,
      references: {
        model: "professores",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "classes",
    timestamps: true,
  }
);

// Aulas/Lessons
const Lesson = sequelize.define(
  "Lesson",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    classId: {
      type: DataTypes.UUID,
      references: {
        model: "classes",
        key: "id",
      },
    },
    dataAula: {
      type: DataTypes.DATE,
    },
    duracao: {
      type: DataTypes.INTEGER, // em minutos
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "lessons",
    timestamps: true,
  }
);

// Relacionamentos
Professor.belongsTo(AreaDeConhecimento, { foreignKey: "areaDeConhecimentoId" });
AreaDeConhecimento.hasMany(Professor, { foreignKey: "areaDeConhecimentoId" });

Turma.belongsTo(Professor, { foreignKey: "professorId" });
Professor.hasMany(Turma, { foreignKey: "professorId" });

Turma.belongsTo(AreaDeConhecimento, { foreignKey: "areaDeConhecimentoId" });
AreaDeConhecimento.hasMany(Turma, { foreignKey: "areaDeConhecimentoId" });

Matricula.belongsTo(Aluno, { foreignKey: "alunoId" });
Aluno.hasMany(Matricula, { foreignKey: "alunoId" });

Matricula.belongsTo(Turma, { foreignKey: "turmaId" });
Turma.hasMany(Matricula, { foreignKey: "turmaId" });

Order.belongsTo(Client, { foreignKey: "clienteId" });
Client.hasMany(Order, { foreignKey: "clienteId" });

Class.belongsTo(Professor, { foreignKey: "professorId" });
Professor.hasMany(Class, { foreignKey: "professorId" });

Lesson.belongsTo(Class, { foreignKey: "classId" });
Class.hasMany(Lesson, { foreignKey: "classId" });

module.exports = {
  sequelize,
  User,
  AreaDeConhecimento,
  Professor,
  Turma,
  Aluno,
  Matricula,
  Product,
  Client,
  Order,
  Student,
  Class,
  Lesson,
};
