import { Schema, model } from 'mongoose';

const ResourceSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  type: { 
    type: String, 
    required: true,
    enum: ['document', 'video', 'image', 'other']
  },
  filePath: String,
  url: String,
  metadata: Schema.Types.Mixed,
  downloads: { type: Number, default: 0 },
  isPublic: { type: Boolean, default: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

export const Resource = model('Resource', ResourceSchema);
