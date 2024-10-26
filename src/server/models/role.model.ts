// src/models/role.model.ts
import { Schema, model } from 'mongoose';

const RoleModel = new Schema({
  roleName: { type: String, required: true, enum: ['admin', 'speaker', 'attendee'] },
  permissions: [{ type: String }]
}, {
  timestamps: true,
  collection: 'roles'
});

// Relationships:
// - One-to-Many with Users (one role can be assigned to many users)
RoleModel.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'roleId'
});

export const Role = model('Role', RoleModel);
