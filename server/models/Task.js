import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
    category: { type: String, default: 'General', trim: true },
    dueDate: { type: String, default: '' },
    createdAt: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
  },
  { versionKey: false }
);

// Transform _id -> id in all JSON responses
taskSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
