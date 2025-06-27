import mongoose, { Schema } from 'mongoose';

const userPromptSchema = new Schema(
  {
    pID: String,
    userPrompt: String,
  },
  {
    timestamps: true,
  }
);

const UserPrompt =
  (mongoose.models && mongoose.models.UserPrompt) ||
  mongoose.model('UserPrompt', userPromptSchema);

export default UserPrompt;
