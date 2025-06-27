import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema(
  {
    pID: String,
    role: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const Chat =
  (mongoose.models && mongoose.models.chat) ||
  mongoose.model('chat', chatSchema);

export default Chat;
