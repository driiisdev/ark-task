// src/models/speakerRequest.model.ts
import { Schema, model } from 'mongoose';

const SpeakerRequestModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  talkTitle: { type: String, required: true },
  talkDescription: { type: String, required: true },
  approvalStatus: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  experience: String,
  preferredDates: [Date],
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date,
  reviewNotes: String
}, {
  timestamps: true,
  collection: 'speakerRequests'
});

// Relationships:
// - Many-to-One with Users (many requests can belong to one user)
// - Many-to-One with Users for reviewer (many requests can be reviewed by one admin)
SpeakerRequestModel.virtual('applicant', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

SpeakerRequestModel.virtual('reviewer', {
  ref: 'User',
  localField: 'reviewedBy',
  foreignField: '_id',
  justOne: true
});

export const SpeakerRequest = model('SpeakerRequest', SpeakerRequestModel);
