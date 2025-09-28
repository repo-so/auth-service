import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
  const payload = { userId };
 
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
