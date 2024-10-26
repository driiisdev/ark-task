// src/models/attendee.model.ts
import { Schema, model } from 'mongoose';

const AttendeeModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  talkId: { type: Schema.Types.ObjectId, ref: 'Talk', required: true },
  registeredAt: { type: Date, default: Date.now },
  attended: { type: Boolean, default: false },
  feedback: String,
  rating: { type: Number, min: 1, max: 5 }
}, {
  timestamps: true,
  collection: 'attendees'
});

// Relationships:
// - Many-to-One with Users (many attendances can belong to one user)
// - Many-to-One with Talks (many attendees can belong to one talk)
AttendeeModel.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

AttendeeModel.virtual('talk', {
  ref: 'Talk',
  localField: 'talkId',
  foreignField: '_id',
  justOne: true
});

export const Attendee = model('Attendee', AttendeeModel);
