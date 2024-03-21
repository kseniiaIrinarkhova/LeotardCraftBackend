import { IUser } from '../types/main';
import UserModel from '../models/User.model'
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const jwtKey: Secret = process.env.JWT_TOKEN_KEY || 'Secret';

export async function register(user: IUser): Promise<void> {
    try {
        //try to create a new user in database
        await UserModel.create(user);
    } catch (error) {
        throw error;
    }
}

export async function login(user: IUser) {
    try {
        //try to find requested username
        const foundUser = await UserModel.findOne({ username: user.username });
        //there is no such user in database
        if (!foundUser) throw new Error("Invalid Credentials");
        //compare requested password with hashed one in database
        const isMatch = bcrypt.compareSync(user.password, foundUser.password);
        //if match - return user info and token
        if (isMatch) {
            //create payload with user ID and username information
            const payload = {
                user: { 
                    id: foundUser._id?.toString(),
                    username: foundUser.username
                 }
            }
            //create token that would expire in 2 days
            const token = jwt.sign(payload, jwtKey, {
                expiresIn: '2 days',
            });

            //return jws token with paylod
            return { token: token };
        }
        //else throw an error
        throw new Error("Invalid Credentials")
    } catch (error) {
        throw error;
    }
}