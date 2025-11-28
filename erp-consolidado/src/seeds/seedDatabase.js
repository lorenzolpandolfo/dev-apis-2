/**
 * Seeds de Dados Iniciais
 * Execute manualmente após sincronização do banco
 */

const {
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
  Sala,
} = require("../models/models");
const bcryptjs = require("bcryptjs");

async function seedDatabase() {
  try {
    console.log("🌱 Iniciando seeds do banco de dados...");

    // Sincronizar modelos
    await sequelize.sync({ alter: true });
    console.log("✅ Banco sincronizado");

    // 1. Criar Áreas de Conhecimento
    console.log("\n📚 Criando Áreas de Conhecimento...");
    const areas = await AreaDeConhecimento.bulkCreate([
      {
        nome: "Engenharia de Software",
        descricao: "Área focada em desenvolvimento e manutenção de software",
      },
      {
        nome: "Administração",
        descricao: "Gestão de negócios e recursos",
      },
      {
        nome: "Educação",
        descricao: "Métodos e práticas educacionais",
      },
    ]);
    console.log(`✅ ${areas.length} áreas criadas`);

    // 2. Criar Usuários (Professores e Alunos)
    console.log("\n👤 Criando usuários...");
    const hashedPassword = await bcryptjs.hash("senha123", 10);

    const users = await User.bulkCreate([
      {
        name: "Admin Sistema",
        email: "admin@erp.com",
        password: hashedPassword,
        role: "admin",
      },
      {
        name: "Prof. Carlos Silva",
        email: "carlos@erp.com",
        password: hashedPassword,
        role: "professor",
      },
      {
        name: "João Student",
        email: "joao@erp.com",
        password: hashedPassword,
        role: "student",
      },
    ]);
    console.log(`✅ ${users.length} usuários criados`);

    // 3. Criar Professores
    console.log("\n👨‍🏫 Criando professores...");
    const professors = await Professor.bulkCreate([
      {
        nome: "Prof. Carlos Silva",
        cpf: "123.456.789-00",
        email: "carlos@erp.com",
        telefone: "11999999999",
        areaDeConhecimentoId: areas[0].id,
      },
      {
        nome: "Prof. Maria Santos",
        cpf: "987.654.321-00",
        email: "maria@erp.com",
        telefone: "11988888888",
        areaDeConhecimentoId: areas[1].id,
      },
    ]);
    console.log(`✅ ${professors.length} professores criados`);

    // 4. Criar Turmas
    console.log("\n📖 Criando turmas...");
    const turmas = await Turma.bulkCreate([
      {
        nome: "Turma A - Engenharia",
        codigo: "ENG-001",
        descricao: "Turma de introdução à Engenharia",
        professorId: professors[0].id,
        areaDeConhecimentoId: areas[0].id,
      },
      {
        nome: "Turma B - Administração",
        codigo: "ADM-001",
        descricao: "Turma de Gestão Administrativa",
        professorId: professors[1].id,
        areaDeConhecimentoId: areas[1].id,
      },
    ]);
    console.log(`✅ ${turmas.length} turmas criadas`);

    // 4.5 Criar Salas
    console.log("\n🏫 Criando salas...");
    const salas = await Sala.bulkCreate([
      {
        numero: "101",
        descricao: "Sala 101 - Bloco A",
        lotacao: 40,
      },
      {
        numero: "102",
        descricao: "Sala 102 - Bloco A",
        lotacao: 30,
      },
    ]);
    console.log(`✅ ${salas.length} salas criadas`);

    // 5. Criar Alunos
    console.log("\n👨‍🎓 Criando alunos...");
    const alunos = await Aluno.bulkCreate([
      {
        nome: "João da Silva",
        cpf: "111.222.333-44",
        email: "joao.silva@example.com",
        matricula: "ALU-001",
        telefone: "11987654321",
        endereco: "Rua A, 123 - São Paulo",
      },
      {
        nome: "Maria Oliveira",
        cpf: "555.666.777-88",
        email: "maria.oliveira@example.com",
        matricula: "ALU-002",
        telefone: "11987654322",
        endereco: "Rua B, 456 - São Paulo",
      },
    ]);
    console.log(`✅ ${alunos.length} alunos criados`);

    // 6. Criar Matrículas
    console.log("\n✍️  Criando matrículas...");
    const matriculas = await Matricula.bulkCreate([
      {
        alunoId: alunos[0].id,
        turmaId: turmas[0].id,
        status: "ativa",
      },
      {
        alunoId: alunos[1].id,
        turmaId: turmas[1].id,
        status: "ativa",
      },
    ]);
    console.log(`✅ ${matriculas.length} matrículas criadas`);

    // 7. Criar Produtos
    console.log("\n🛍️  Criando produtos...");
    const products = await Product.bulkCreate([
      {
        codigo: "PROD-001",
        nome: "Livro Node.js",
        descricao: "Guia completo de Node.js",
        preco: 89.9,
        estoque: 50,
        ativo: true,
      },
      {
        codigo: "PROD-002",
        nome: "Curso PostgreSQL",
        descricao: "Curso completo de PostgreSQL",
        preco: 129.9,
        estoque: 30,
        ativo: true,
      },
    ]);
    console.log(`✅ ${products.length} produtos criados`);

    // 8. Criar Clientes
    console.log("\n🏢 Criando clientes...");
    const clients = await Client.bulkCreate([
      {
        razaoSocial: "Empresa XYZ Ltda",
        nomeFantasia: "XYZ Solutions",
        cnpj: "12.345.678/0001-00",
        email: "contato@xyz.com",
        telefone: "1133334444",
        endereco: "Av. Paulista, 1000 - São Paulo",
        ativo: true,
      },
      {
        razaoSocial: "Tech Solutions Ltda",
        nomeFantasia: "Tech Solutions",
        cnpj: "87.654.321/0001-99",
        email: "contato@techsolutions.com",
        telefone: "1144445555",
        endereco: "Rua Augusta, 2000 - São Paulo",
        ativo: true,
      },
    ]);
    console.log(`✅ ${clients.length} clientes criados`);

    // 9. Criar Pedidos
    console.log("\n📦 Criando pedidos...");
    const orders = await Order.bulkCreate([
      {
        numero: "PED-001",
        clienteId: clients[0].id,
        status: "entregue",
        valorTotal: 179.8,
      },
      {
        numero: "PED-002",
        clienteId: clients[1].id,
        status: "processando",
        valorTotal: 259.8,
      },
    ]);
    console.log(`✅ ${orders.length} pedidos criados`);

    // 10. Criar Estudantes (Classes)
    console.log("\n👨‍💼 Criando estudantes (Classes)...");
    const students = await Student.bulkCreate([
      {
        nome: "Pedro Santos",
        email: "pedro@example.com",
        matricula: "STU-001",
        dataNascimento: new Date("1998-05-15"),
        ativo: true,
      },
      {
        nome: "Ana Costa",
        email: "ana@example.com",
        matricula: "STU-002",
        dataNascimento: new Date("1999-08-22"),
        ativo: true,
      },
    ]);
    console.log(`✅ ${students.length} estudantes criados`);

    // 11. Criar Classes
    console.log("\n🎓 Criando classes...");
    const classes = await Class.bulkCreate([
      {
        nome: "Arquitetura de Software",
        codigo: "ARCH-001",
        descricao: "Padrões e princípios de arquitetura",
        professorId: professors[0].id,
      },
    ]);
    console.log(`✅ ${classes.length} classes criadas`);

    // 12. Criar Aulas (Lessons)
    console.log("\n📝 Criando aulas...");
    const lessons = await Lesson.bulkCreate([
      {
        titulo: "Introdução à Arquitetura",
        descricao: "Conceitos básicos de arquitetura",
        classId: classes[0].id,
        dataAula: new Date("2024-12-10T14:00:00"),
        duracao: 120,
      },
    ]);
    console.log(`✅ ${lessons.length} aulas criadas`);

    console.log("\n╔════════════════════════════════════════╗");
    console.log("║   ✅ Seeds executadas com sucesso!   ║");
    console.log("╚════════════════════════════════════════╝\n");
    console.log("📊 Resumo:");
    console.log(`   • ${areas.length} Áreas de Conhecimento`);
    console.log(`   • ${users.length} Usuários`);
    console.log(`   • ${professors.length} Professores`);
    console.log(`   • ${turmas.length} Turmas`);
    console.log(`   • ${alunos.length} Alunos`);
    console.log(`   • ${matriculas.length} Matrículas`);
    console.log(`   • ${products.length} Produtos`);
    console.log(`   • ${clients.length} Clientes`);
    console.log(`   • ${orders.length} Pedidos`);
    console.log(`   • ${students.length} Estudantes`);
    console.log(`   • ${classes.length} Classes`);
    console.log(`   • ${lessons.length} Aulas\n`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao executar seeds:", error.message);
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();
