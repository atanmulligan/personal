import mongoose, { Schema } from 'mongoose';

const userProfileSchema = new Schema(
    {
        pID: String,
        code: String,
        userProfile: String,
    },
    {
        timestamps: true,
    }
);

const UserProfile =
    (mongoose.models && mongoose.models.UserProfile) ||
    mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
