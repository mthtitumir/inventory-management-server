import { Schema, model } from 'mongoose';
import { TTask } from './task.interface';
import { priority, status, type } from './task.constant';

const taskSchema = new Schema<TTask>({
  taskId: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required!'],
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required!'],
  },
  status: {
    type: String,
    enum: {
      values: status,
      message: '{VALUE} is not a valid status!',
    },
    required: [true, 'Status is required!'],
  },
  type: {
    type: String,
    enum: {
      values: type,
      message: '{VALUE} is not a valid task type!',
    },
    default: 'personal',
  },
  priority: {
    type: String,
    enum: {
      values: priority,
      message: '{VALUE} is not a valid priority!',
    },
    required: true,
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Assignee is required!'],
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
}, {timestamps: true});

export const Task = model<TTask>('Task', taskSchema);
