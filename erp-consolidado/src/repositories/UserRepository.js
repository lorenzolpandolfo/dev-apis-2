/**
 * Repositório de Usuários
 * Gerencia operações com usuários (autenticação e autorização)
 */

const BaseRepository = require("./BaseRepository");
const { User } = require("../models/models");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    return this.findOneBy({ email });
  }

  async findByRole(role) {
    return this.findManyBy({ role });
  }
}

module.exports = new UserRepository();
