import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';


export const encryptPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password with salt
    const hashedPassword = await bcrypt.hash(password, salt);
    // Replace plain password with hashed password
    req.body.password = hashedPassword;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error encrypting password:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const verifyPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
      // Membandingkan kata sandi yang dimasukkan dengan kata sandi yang di-hash
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match; // Mengembalikan true jika kata sandi cocok, dan false jika tidak cocok
    } catch (error) {
      console.error('Error verifying password:', error);
      throw new Error('Internal server error');
    }
  };
