import { Express, Request, Response } from 'express';
import UserService from '../service/UserService';
import { UserEntity } from '../service/UserService';
import { encryptPassword } from '../middleware/AuthMiddleware';
import { verifyPassword } from '../middleware/AuthMiddleware';

class UserController {
  app: Express;

  constructor(app: Express) {
    this.app = app;
  }

  setup() {
    this.app.post('/api/v2/login', this.login);
    this.app.post('/api/v2/users', encryptPassword, this.createUser);
    this.app.get('/api/v2/users', this.findAll);
  }

  async createUser(req: Request, res: Response) {
    const service = new UserService();

    const { username, password, role } = req.body;
    try {
      const existingUser = await service.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({
          message: 'User Sudah Ada',
          
        });
      }

      const data: UserEntity = {
        username: username,
        password: password,
        role: role,
      };

      const result = await service.store(data);
      res.status(201).json({
        message: 'Berhasil Menambahkan User',
        data: result,
        status: 'success',
        URL: '/login',
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({
        message: 'Terdapat Kesalahan di sisi server',
      });
    }
  }

  async login(req: Request, res: Response) {
    const service = new UserService();

    const { username, password } = req.body;
    try {
      const user = await service.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({
          message: 'User tidak ditemukan',
          status:'fail',
        });
      }

      // Verifikasi kata sandi
      const passwordMatch = await verifyPassword(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          message: 'Kata Sandi Salah',
          status:'fail',
        });
      }

      // Jika username dan kata sandi benar, kirimkan respons berhasil
      return res.status(200).json({
        message: 'Berhasil Login',
        data: user,
        status: 'success',
        URL: '/products', // Atur URL redirect setelah login berhasil
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({
        message: 'Terdapat Kesalahan di sisi server',
      });
    }
  }

  async findAll(req: Request, res: Response) {
    const service = new UserService();

    try {
      const hasil = await service.getAll();
      return res.status(200).json({
        message: 'Berhasil Menampilkan Data',
        data: hasil,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Terdapat Kesalahan di sisi server',
      });
    }
  }
}

export default UserController;
