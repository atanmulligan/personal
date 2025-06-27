import mongoose, { Schema } from 'mongoose';

const tstItemSchema = new Schema({
  text: String,
  checked: Boolean,
  selfType: String,
  condition: String,
});

const tstSchema = new Schema(
  {
    pID: String,
    tstList: [tstItemSchema],
  },
  {
    timestamps: true,
  }
);

const Tst =
  (mongoose.models && mongoose.models.Tst) || mongoose.model('Tst', tstSchema);

export default Tst;
