import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error.util';
import * as userServices from '../services/user.service';
import { ICustomRequest, IUserTokenPayload } from '../types/main';

export default class UserController {
    //CRUD operations for User

    

    /**
     * Create User in database
     * @param req Request
     * @param res Response
     * @returns result of user registration
     */
    async registerOne(req: Request, res: Response) {
        try {
            const token = await userServices.register(req.body);
            return res.status(201).json({ data: token, message: "User has beed created." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
     * Login by User
     * @param req Request
     * @param res Response
     * @returns result of login attempt
     */
    async loginOne(req: Request, res: Response) {
        try {
            const token = await userServices.login(req.body);
            res.status(200).json({ data: token });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
         * Get user information by ID
         * @param req Request with token data
         * @param res response
         * @returns user data without password
         */
    async getUserInfo(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get user data
            const user = await userServices.getUserById((req.token as IUserTokenPayload).user._id)
            //return result
            return res.status(200).json({ data: user });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
     * Update user data
     * @param req request with token data
     * @param res response
     * @returns updated user data without password
     */
    async updateUser(req: ICustomRequest, res: Response){
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get user data
            const updatedUser = await userServices.updateUser(req.body, (req.token as IUserTokenPayload).user._id)
            //return updated user
            return res.status(200).send({ data: updatedUser, message: "User has been updated." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
     * Delete user
     * @param req request with token data
     * @param res response
     * @returns 
     */
    async deleteUser(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //try to delete user and get information about deleted user
            const deletedUser = await userServices.deleteUser((req.token as IUserTokenPayload).user._id)
            //return information about deleted user
            return res.status(200).send({ data: deletedUser, message: "User has been deleted." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }
}