import mongoose, { Schema } from 'mongoose';

const pariticipantSchema = new Schema(
  {
    pID: String,
    condition: String,
    prolificCode: String,
    consent: Boolean,
    understandInstruction: Boolean,
    version: Number,
    finished: Boolean,
    finishedAt: Date,
    interview: Boolean,
  },
  {
    timestamps: true,
  }
);

const Participant =
  (mongoose.models && mongoose.models.Participant) ||
  mongoose.model('Participant', pariticipantSchema);

export default Participant;
