import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/generateToken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1]; //only gets the token part
    const decoded = verifyToken(token) as { userId: string }; //decode to retrieve previously encoded userId, so you can perform the routes after

    (req as any).userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
