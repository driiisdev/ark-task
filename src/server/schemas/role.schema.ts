import { Schema } from 'mongoose';

export interface IRole {
  roleName: 'admin' | 'speaker' | 'attendee';
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const roleSchema = new Schema<IRole>({
  roleName: {
    type: String,
    required: true,
    enum: ['admin', 'speaker', 'attendee'],
    unique: true
  },
  permissions: [{
    type: String,
    required: true
  }],
}, {
  timestamps: true
});
