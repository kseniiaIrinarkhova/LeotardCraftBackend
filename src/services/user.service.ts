import { IUser } from '../types/main';
import UserModel from '../models/User.model'
import bcrypt from 'bcrypt';

export async function register(user: IUser): Promise<void> {
    try {
        //try to create a new user in database
        await UserModel.create(user);
    } catch (error) {
        throw error;
    }
}

export async function login(user: IUser): Promise<IUser> {
    try {
        //try to find requested username
        const foundUser = await UserModel.findOne({ username: user.username });
        //there is no such user in database
        if (!foundUser) throw new Error("Invalid Credentials");
        //compare requested password with hashed one in database
        const isMatch = bcrypt.compareSync(user.password, foundUser.password);
        //if match - return user
        if (isMatch) return foundUser;
        //else throw an error
        throw new Error("Invalid Credentials")
    } catch (error) {
        throw error;
    }
}