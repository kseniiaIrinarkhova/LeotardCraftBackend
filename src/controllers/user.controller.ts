import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error.util';
import * as userServices from '../services/user.service';

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
    async loginOne(req: Request, res: Response){
        try {
            const foundUser = await userServices.login(req.body);
            res.status(200).json({ data: foundUser });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }


}