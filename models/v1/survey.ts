import mongoose, { Schema } from 'mongoose';

const surveySchema = new Schema(
  {
    pID: String,
    group: String,
    formData: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

const Survey =
  (mongoose.models && mongoose.models.Survey) ||
  mongoose.model('Survey', surveySchema);

export default Survey;
