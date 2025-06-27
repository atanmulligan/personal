import mongoose, { Schema } from 'mongoose';

const adminSchema = new Schema(
    {
        password: String,
    },
    {
        timestamps: true,
    }
);

const Admin =
    (mongoose.models && mongoose.models.admin) ||
    mongoose.model('admin', adminSchema);

export default Admin;
