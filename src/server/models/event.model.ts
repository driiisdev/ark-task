import { Schema, model } from 'mongoose';

const EventModel = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  description: String,
  capacity: Number,
  isPublished: { type: Boolean, default: false }
}, {
  timestamps: true,
  collection: 'events'
});

// Relationships:
// - One-to-Many with Talks (one event can have many talks)
EventModel.virtual('talks', {
  ref: 'Talk',
  localField: '_id',
  foreignField: 'eventId'
});

export const Event = model('Event', EventModel);
