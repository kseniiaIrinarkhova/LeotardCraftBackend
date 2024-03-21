import { Schema, model } from 'mongoose';
import { IUser, TUserUpdatedData } from '../types/main';
import bcrypt from 'bcrypt';

const saltRounds = 10

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username should not be empty!"],
        unique: true,
        immutable: true //to avoid possibility of field update
    },
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: [true, "Email should not be empty!"],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//hash password before saving it to DB while creating user
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, saltRounds);
    }
    next();
});

//hash password before updating
userSchema.pre('findOneAndUpdate', async function (next) {
    //get updated data
    const updData = this.getUpdate() as TUserUpdatedData
    //if password is supposed to be changed 
    if (updData.password) {
        //change it to hash
        updData.password = await bcrypt.hashSync(updData.password, saltRounds)
    }
    next();
});

export default model<IUser>("User", userSchema);