import { Schema, Types } from 'mongoose';

export interface ISpeakerRequest {
  userId: Types.ObjectId;
  talkTitle: string;
  talkDescription: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  experience?: string;
  preferredDates?: Date[];
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  reviewNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const speakerRequestSchema = new Schema<ISpeakerRequest>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  talkTitle: {
    type: String,
    required: true
  },
  talkDescription: {
    type: String,
    required: true
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  experience: String,
  preferredDates: [Date],
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  reviewNotes: String
}, {
  timestamps: true
});
