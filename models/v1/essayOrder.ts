import mongoose, { Schema } from 'mongoose';

const essayOrderSchema = new Schema(
    {
        pID: { type: String, required: true },
        essayNumber: Number, // 1,2,3,4,5
        order: [String], //D, DPV, ..
    },
    {
        timestamps: true,
    }
);

const EssayOrder =
    (mongoose.models && mongoose.models.essayOrder) ||
    mongoose.model('essayOrder', essayOrderSchema);

export default EssayOrder;
