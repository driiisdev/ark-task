import { Schema, Types } from 'mongoose';

export interface ITalk {
  title: string;
  description: string;
  speakerId: Types.ObjectId;
  eventId: Types.ObjectId;
  duration: number;
  startTime: Date;
  tags?: string[];
  materials?: string[];
  maxAttendees?: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const talkSchema = new Schema<ITalk>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  speakerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  tags: [String],
  materials: [String],
  maxAttendees: Number,
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});
