//  to get all lessons with subscription status
import User from '../models/User';
import Lesson from '../models/Lesson';
import { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user: { id: string };
}   
export const getSubscribedLessons = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // Read userId directly from req

    //Get user's subscribed Lesson IDs
    const user = await User.findById(userId).select('subscribedLessons');

    if (!user || !user.subscribedLessons) {
      return res.status(404).json({ error: 'User or subscribed lessons not found' });
    }

    const allLessons = await Lesson.find().lean(); //.lean() to get plain JS objects

    // Add a `subscribed` field to each course e usa come array contenente sia stringhe che ObjectId per convertire toString()
    const subscribedSet = new Set((user.subscribedLessons).map(id => id.toString()));

    const coursesWithStatus = allLessons.map(lesson => ({
      ...lesson,
      subscribed: subscribedSet.has(lesson._id.toString()) //true or false
    }));

    res.status(200).json(coursesWithStatus);
  } catch (error) {
    console.log("req.userId:", (req as any).userId);
    res.status(500).json({ error: 'Failed to fetch subscribed Lessons' });
  }
};
