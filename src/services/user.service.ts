import { IUser, IUserTokenPayload } from '../types/main';
import UserModel from '../models/User.model'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtKey } from '../middleware/auth';
import dotenv from "dotenv";
import { ObjectId, TypeExpressionOperatorReturningObjectId, Types } from 'mongoose';
dotenv.config();


 async function register(user: IUser): Promise<void> {
    try {
        //try to create a new user in database
        await UserModel.create(user);
    } catch (error) {
        throw error;
    }
}

 async function login(user: IUser) {
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
            const payload : IUserTokenPayload = {
                user: { 
                    _id: foundUser._id?.toString(),
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

/**
 * Function that returns user data by ID
 * @param id user id
 * @returns user data without password
 */
async function getUserById(id: Types.ObjectId) {
    try {
        //try to find requested user
        const foundUser = await UserModel.findOne({ _id: id }).select('-password');
        //there is no such user in database
        if (!foundUser) throw new Error("Oops, some issue with getting user data");
        return foundUser 
    } catch (error) {
        throw error;
    }
}

/**
 * Function that update user data
 * @param changedData data from request body
 * @param id user id
 * @returns user data without password
 */
async function updateUser(changedData:any , id: Types.ObjectId) {
    try {
        //try to get user by id and change it
        const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, changedData, { new: true }).select('-password');
        if (!updatedUser) {
            throw new Error("Requested User not found!");
        }
        return  updatedUser 
    } catch (error) {
        throw error;
    }
}

/**
 * Function that delete user from DB 
 * @param id user id
 * @returns user data without password
 */
async function deleteUser(id: Types.ObjectId) {
    try {
        //try to delete user by ID
        const deletedUser = await UserModel.findByIdAndDelete({ _id: id }).select('-password');
        if (!deletedUser) {
            throw new Error("Requested User not found!");
        }
        return deletedUser
    } catch (error) {
        throw error;
    }
}

export { register, login, getUserById, updateUser, deleteUser }