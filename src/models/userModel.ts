import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Hash password before saving
userSchema.pre('save', async function (this: User, next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const UserModel = mongoose.model<User>('User', userSchema);

export default UserModel;