// for subscribe and unsubscribe logic
import { Request, Response } from "express";
import mongoose from 'mongoose';

import User from '../models/User';
import Lesson from '../models/Lesson';

interface AuthenticatedRequest extends Request {
  user: { id: string };
}


export const subscribeToLesson = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const lessonId = req.params.id;

    //Validate lessonId to prevent NoSQL injection or crashes
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      return res.status(400).json({ error: 'Invalid lesson ID' });
    }

    const user = await User.findById(userId).select('subscribedLessons'); // select: fetch only the "subscribedLessons" field
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isSubscribed = user.subscribedLessons.some(
      (id: any) => id.toString() === lessonId
    );

    if (isSubscribed) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { subscribedLessons: lessonId } }
      );
      await Lesson.findByIdAndUpdate(
        lessonId,
        { $pull: { subscribers: userId } }
      );
      return res.status(200).json({ message: 'Unsubscribed from Lesson.' });
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { subscribedLessons: lessonId } }
      );
      await Lesson.findByIdAndUpdate(
        lessonId,
        { $addToSet: { subscribers: userId } }
      );
      return res.status(200).json({ message: 'Subscribed to Lesson.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Subscription toggle failed.' });
  }
};



