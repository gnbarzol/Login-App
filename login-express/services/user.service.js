const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { User } = require('../models');

class UserService {
  constructor() {
    this.table = User;
  }

  async getAll() {
    const users = await this.table.findAll({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    return users;
  }

  async createUser({ user }) {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await this.table.create({
      ...user,
      password: hashedPassword,
    });
    return userCreated.id ? userCreated.id : null;
  }

  async getUserById({ id }) {
    const user = await this.table.findOne({
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      where: {
        id: id,
      },
    });
    return user;
  }

  async getUserByUsernameOrEmail({ email }) {
    const user = await this.table.findOne({
      where: {
        [Op.or]: [{ username: email }, { email: email }],
      },
    });
    return user;
  }

  async getUserByUsername({ username }) {
    const user = await this.table.findOne({
      where: {
        username: username,
      },
    });
    return user;
  }

  async getUserByEmail({ email }) {
    const user = await this.table.findOne({
      where: {
        email: email,
      },
    });
    return user;
  }

  async updateUserById({ user, id }) {
    const userUpdated = await this.table.update(
      { ...user },
      {
        where: {
          id: id,
        },
      }
    );
    return userUpdated;
  }
}

module.exports = UserService;
