import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User'; 

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const createUser = async (email: string, password: string): Promise<IUser> => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    password: hashed,
  });

  await newUser.save();
  return newUser;
};

export const validatePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
