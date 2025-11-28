/**
 * Arquivo de Índice de Exports
 * Facilita importações dos módulos principais
 */

module.exports = {
  // Controladores
  AuthController: require("./controllers/AuthController"),
  AlunoController: require("./controllers/AlunoController"),
  ProfessorController: require("./controllers/ProfessorController"),
  TurmaController: require("./controllers/TurmaController"),
  MatriculaController: require("./controllers/MatriculaController"),
  ProductController: require("./controllers/ProductController"),
  ClientController: require("./controllers/ClientController"),
  OrderController: require("./controllers/OrderController"),
  AreaDeConhecimentoController: require("./controllers/AreaDeConhecimentoController"),
  StudentController: require("./controllers/StudentController"),
  ClassController: require("./controllers/ClassController"),
  LessonController: require("./controllers/LessonController"),

  // Serviços
  AuthService: require("./services/AuthService"),
  AlunoService: require("./services/AlunoService"),
  ProfessorService: require("./services/ProfessorService"),
  TurmaService: require("./services/TurmaService"),
  MatriculaService: require("./services/MatriculaService"),
  ProductService: require("./services/ProductService"),
  ClientService: require("./services/ClientService"),
  OrderService: require("./services/OrderService"),
  AreaDeConhecimentoService: require("./services/AreaDeConhecimentoService"),
  StudentService: require("./services/StudentService"),
  ClassService: require("./services/ClassService"),
  LessonService: require("./services/LessonService"),

  // Repositórios
  BaseRepository: require("./repositories/BaseRepository"),
  UserRepository: require("./repositories/UserRepository"),
  AlunoRepository: require("./repositories/AlunoRepository"),
  ProfessorRepository: require("./repositories/ProfessorRepository"),
  TurmaRepository: require("./repositories/TurmaRepository"),
  MatriculaRepository: require("./repositories/MatriculaRepository"),
  ProductRepository: require("./repositories/ProductRepository"),
  ClientRepository: require("./repositories/ClientRepository"),
  OrderRepository: require("./repositories/OrderRepository"),
  AreaDeConhecimentoRepository: require("./repositories/AreaDeConhecimentoRepository"),
  StudentRepository: require("./repositories/StudentRepository"),
  ClassRepository: require("./repositories/ClassRepository"),
  LessonRepository: require("./repositories/LessonRepository"),

  // Middlewares
  authMiddleware: require("./middlewares/authMiddleware"),
  authorizationMiddleware: require("./middlewares/authorizationMiddleware"),
  requestLogger: require("./middlewares/requestLogger"),
  errorHandler: require("./middlewares/errorHandler"),

  // Modelos
  models: require("./models/models"),
};
