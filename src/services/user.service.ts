import { IUser } from '../types/main';
import UserModel from '../models/User.model'

export async function register(user: IUser): Promise<void> {
    try {
        await UserModel.create(user);
    } catch (error) {
        throw error;
    }
}

export async function login(user: IUser) : Promise<IUser> {
    try {
        const foundUser = await UserModel.findOne({ username: user.username, password: user.password });
        console.log(foundUser)
        if (foundUser) return foundUser;
        throw new Error("Invalid Credentials")
    } catch (error) {
        throw error;
    }
}