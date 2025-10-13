import mongoose, { Document, Schema, Types } from "mongoose";

export interface ILesson extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  duration: string; 
  subscribers: [];
}

const LessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: String, required: true },
    subscribers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema);
export default Lesson;
