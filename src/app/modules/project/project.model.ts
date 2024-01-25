import { Schema, model } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema<TProject>({
  name: {
    type: String,
    required: [true, 'Name is required!'],
  },
  description: {
    type: String,
  },
  admin: {
    type: Schema.Types.ObjectId,
    required: [true, 'Admin is required!'],
    ref: 'User',
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
}, {timestamps: true});

export const Project = model('Project', projectSchema);
