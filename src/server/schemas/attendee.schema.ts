import { Schema, Types } from 'mongoose';

export interface IAttendee {
  userId: Types.ObjectId;
  talkId: Types.ObjectId;
  registeredAt: Date;
  attended: boolean;
  feedback?: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export const attendeeSchema = new Schema<IAttendee>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  talkId: {
    type: Schema.Types.ObjectId,
    ref: 'Talk',
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  attended: {
    type: Boolean,
    default: false
  },
  feedback: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
}, {
  timestamps: true
});
