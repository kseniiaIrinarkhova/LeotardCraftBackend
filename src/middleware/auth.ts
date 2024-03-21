import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ICustomRequest } from '../types/main';

export const jwtKey: Secret = process.env.JWT_TOKEN_KEY || 'Secret';



export const auth = async (req: ICustomRequest | Request, res: Response, next: NextFunction) => {
    try {
        //get token from the header
        const token = req.header('x-auth-token');
        //check if there is not a token
        if (!token) {
            return res.status(401).json({ errors: [{ message: "No token, auth denied" }] })
        }

        //verify if token is valid
        const decoded = jwt.verify(token, jwtKey);
        (req as ICustomRequest).token = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ errors: [ err, { message: "Token is not valid" }] })
    }
};