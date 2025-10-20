import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generateTokens = (userId: string, email: string) => {
  const payload = { userId, email };
 
const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  return { accessToken, refreshToken };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
