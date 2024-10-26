import { Schema, model } from 'mongoose';

const UserModel = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  isVerified: { type: Boolean, default: false },
  lastLogin: { type: Date }
}, {
  timestamps: true,
  collection: 'users'
});

// Relationships:
// - Many-to-One with Roles (many users can have one role)
// - One-to-Many with Talks (one user/speaker can have many talks)
// - One-to-Many with Attendees (one user can attend many talks)
// - One-to-Many with SpeakerRequests (one user can have many speaker requests)
UserModel.virtual('role', {
  ref: 'Role',
  localField: 'roleId',
  foreignField: '_id',
  justOne: true
});

UserModel.virtual('talks', {
  ref: 'Talk',
  localField: '_id',
  foreignField: 'speakerId'
});

UserModel.virtual('attendances', {
  ref: 'Attendee',
  localField: '_id',
  foreignField: 'userId'
});

UserModel.virtual('speakerRequests', {
  ref: 'SpeakerRequest',
  localField: '_id',
  foreignField: 'userId'
});

export const User = model('User', UserModel);
