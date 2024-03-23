import { IUser, IUserTokenPayload } from '../types/main';
import UserModel from '../models/User.model'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtKey } from '../middleware/auth';
import dotenv from "dotenv";
import { ObjectId, TypeExpressionOperatorReturningObjectId, Types } from 'mongoose';
dotenv.config();


async function register(user: IUser) {
    //try to create a new user in database
    const newUser = await UserModel.create(user);
    //return jws token with paylod
    return createToken(newUser._id, newUser.username);
}

async function login(user: IUser) {
    //try to find requested username
    const foundUser = await UserModel.findOne({ username: user.username });
    //there is no such user in database
    if (!foundUser) throw new Error("Error POST. Invalid Credentials");
    //compare requested password with hashed one in database
    const isMatch = bcrypt.compareSync(user.password, foundUser.password);
    //if match - return user info and token
    if (isMatch) {
        //return jws token with paylod
        return createToken(foundUser._id, foundUser.username);
    }
    //else throw an error
    throw new Error("Error POST. Invalid Credentials")
}

/**
 * Function that returns user data by ID
 * @param id user id
 * @returns user data without password
 */
async function getUserById(id: Types.ObjectId) {
    //try to find requested user
    const foundUser = await UserModel.findOne({ _id: id }).select('-password');
    //there is no such user in database
    if (!foundUser) throw new Error(`Error GET. Can not find user with ID=${id}`);
    return foundUser;
}

/**
 * Function that update user data
 * @param changedData data from request body
 * @param id user id
 * @returns user data without password
 */
async function updateUser(changedData: any, id: Types.ObjectId) {
    //try to get user by id and change it
    const updatedUser = await UserModel.findByIdAndUpdate({ _id: id }, changedData, { new: true }).select('-password');
    //if there is no user with reqiested id - throw error
    if (!updatedUser) throw new Error(`Error PATCH. Can not find user with ID=${id}`);
    return updatedUser
}

/**
 * Function that delete user from DB 
 * @param id user id
 * @returns user data without password
 */
async function deleteUser(id: Types.ObjectId) {
        //try to delete user by ID
        const deletedUser = await UserModel.findByIdAndDelete({ _id: id }).select('-password');
        //if there is no user with reqiested id - throw error
        if (!deletedUser) throw new Error(`Error DELETE. Can not find user with ID=${id}`);
        return deletedUser
}

export { register, login, getUserById, updateUser, deleteUser }

/**
 * Helper function to create token
 * @param _id user id from database
 * @param username user name
 * @returns Object with property 'token'
 */
function createToken(_id: Types.ObjectId, username: string) {
    //create payload with user ID and username information
    const payload: IUserTokenPayload = {
        user: {
            _id: _id,
            username: username
        }
    }
    //create token that would expire in 2 days
    const token = jwt.sign(payload, jwtKey, {
        expiresIn: '2 days',
    });

    //return jws token with paylod
    return { token: token };

}
