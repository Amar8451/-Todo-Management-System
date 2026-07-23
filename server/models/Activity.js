import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    timestamp: { type: String, default: () => new Date().toISOString() },
  },
  { versionKey: false }
);

activitySchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
