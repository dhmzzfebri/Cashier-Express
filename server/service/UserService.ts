const db = require('../models');

export interface UserEntity {
  username: string;
  password: string;
  role: string;
}

class UserService {
  async store(data: UserEntity) {
    try {
      const result = await db.user.create({
        username: data.username,
        password: data.password,
        role: data.role,
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async getUserByUsername(username: string) {
    try {
      const user = await db.user.findOne({ where: { username: username } });
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Read Operation
  async getAll() {
    try {
      const user = await db.user.findAll();
      return user;
    } catch (error) {
      return error;
    }
  }
}
export default UserService;
