import { Schema, model } from 'mongoose';

const TalkModel = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  speakerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  duration: { type: Number, required: true },
  startTime: { type: Date, required: true },
  tags: [String],
  materials: [String],
  maxAttendees: Number,
  isPublished: { type: Boolean, default: false }
}, {
  timestamps: true,
  collection: 'talks'
});

// Relationships:
// - Many-to-One with Users (many talks can belong to one speaker)
// - Many-to-One with Events (many talks can belong to one event)
// - One-to-Many with Attendees (one talk can have many attendees)
TalkModel.virtual('speaker', {
  ref: 'User',
  localField: 'speakerId',
  foreignField: '_id',
  justOne: true
});

TalkModel.virtual('event', {
  ref: 'Event',
  localField: 'eventId',
  foreignField: '_id',
  justOne: true
});

TalkModel.virtual('attendees', {
  ref: 'Attendee',
  localField: '_id',
  foreignField: 'talkId'
});

export const Talk = model('Talk', TalkModel);
