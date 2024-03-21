import { IUser } from '../types/main';
import UserModel from '../models/User.model'

export async function register(user: IUser): Promise<void> {
    try {
        await UserModel.create(user);
    } catch (error) {
        throw error;
    }
}

export async function login(user: IUser) {
    try {
        const foundUser = await UserModel.findOne({ name: user.username, password: user.password });
    } catch (error) {
        throw error;
    }
}