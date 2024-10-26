import { Schema } from 'mongoose';

export interface IEvent {
  title: string;
  date: Date;
  time: string;
  location: string;
  description?: string;
  capacity?: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: String,
  capacity: Number,
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
