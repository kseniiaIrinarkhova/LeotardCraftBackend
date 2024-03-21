import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error.util';
import * as userServices from '../services/user.service';
import { ICustomRequest, IUserTokenPayload } from '../types/main';

export default class UserController {
    //CRUD operations for User

    /**
     * Get user information by ID
     * @param req Request with token data
     * @param res resonse
     * @returns user data without password
     */
    async getUserInfo(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get user data
            const user = await userServices.getUserById((req.token as IUserTokenPayload).user._id)
            //return result
            return res.status(201).json({ data: user });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
     * Create User in database
     * @param req Request
     * @param res Response
     * @returns result of user registration
     */
    async registerOne(req: Request, res: Response) {
        try {
            await userServices.register(req.body);
            return res.status(201).json({ data: "new user", message: "User has beed created." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
     * Login by User
     * @param req Request
     * @param res Response
     * @returns result or log in attempt
     */
    async loginOne(req: Request, res: Response) {
        try {
            const token = await userServices.login(req.body);
            res.status(200).json({ data: token });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }


}