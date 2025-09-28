//to verify still
import { Router } from "express";
import { createUser, findUserByEmail, validatePassword } from "../services/userFunctions";
import { generateToken, verifyToken } from "../utils/generateToken";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await createUser(email, password);
    res.status(201).json({ message: 'User created', user: { email: newUser.email } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await validatePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken } = generateToken(user._id.toString());

    // Send refreshToken as an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.json({ accessToken });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Profile
import { Request, Response } from 'express';

router.get('/profile', authMiddleware, async (req: Request, res: Response) => {
  try {
    const email = (req as any).email;

    const user = await findUserByEmail(email); 
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ id: user._id, email: user.email });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;
