import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { User } from '../db/models/user.model.js';
import { errorMessages, roles, SALT } from '../config.js';

class UserService {
  async getUsers() {
    return User.scope('withoutPassword').findAll({ order: ['id'] });
  }

  async getUserById(id) {
    const user = await User.findOne({ where: { id } });

    if (!user) throw new Error(errorMessages.USER_NOT_EXISTS_ID);

    return user;
  }

  async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async createUser(userData) {
    const user = { ...userData };
    user.id = uuid();
    user.password = await bcrypt.hash(userData.password, SALT);
    user.role = roles.USER;

    await User.create(user);

    return User.findOne({ where: { id: user.id } });
  }

  async updateUser(id, userData) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error(errorMessages.USER_NOT_EXISTS_ID);

    await User.update(userData, { where: { id } });

    return User.findOne({ where: { id } });
  }

  async deleteUser(id) {
    const user = await User.findOne({ where: { id } });
    if (!user) throw new Error(errorMessages.USER_NOT_EXISTS_ID);

    await User.destroy({ where: { id } });

    return user;
  }
}

export default new UserService();
