import mongoose, { Schema } from 'mongoose';

const essaySchema = new Schema(
  {
    pID: String,
    essayNumber: Number, // 1,2,3,4,5
    condition: String, // D, DPV, ..
    systemMessage: String,
    essayText: String,
  },
  {
    timestamps: true,
  }
);

const Essay =
  (mongoose.models && mongoose.models.essay) ||
  mongoose.model('essay', essaySchema);

export default Essay;
