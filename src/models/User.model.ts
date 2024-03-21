import { Schema, model } from 'mongoose';
import { IUser } from '../types/main';
import bcrypt from 'bcrypt';

const saltRounds = 10

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username should not be empty!"],
        unique: true 
    },
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: [true, "Email should not be empty!"],
        unique: true 
    },
    password : {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

export default model<IUser>("User", userSchema);