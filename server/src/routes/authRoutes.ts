import { Router, Request, Response } from "express";
import User from "../models/User";
import { generateTokens, verifyToken } from "../utils/generateToken";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

//register
router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "User created", user: { email: newUser.email } });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens(user._id.toString(), user.email);

    // Refresh token in HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, 
      sameSite: "strict",
    });

    res.json({ accessToken });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//refresh token
router.post("/refresh", async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const decoded = verifyToken(token) as { userId: string; email: string };
    const { accessToken, refreshToken } = generateTokens(decoded.userId, decoded.email);

    // Send new refresh token as cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.json({ accessToken });
  } catch (err) {
    console.error("Refresh error:", err);
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

//profile
router.get("/profile", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ id: user._id, email: user.email });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
