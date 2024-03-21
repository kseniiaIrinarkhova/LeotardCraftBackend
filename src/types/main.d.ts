import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Types, Document, ObjectId } from 'mongoose';

//types and interfaces for main data entries
/**
 * User type
 */
interface IUser extends Document {
    /**
     * user username
     */
    username: string;
    /**
     * user first name
     */
    first_name?: string;
    /**
     * user lest name
     */
    last_name?: string;
    /**
     * user email
     */
    email: string;
    /**
     * password
     */
    password:string
}

/**
 * Interface for custom request in auth middleware
 */
interface ICustomRequest extends Request {
    //token information
    token?: string | IUserTokenPayload | JwtPayload;
}
/**
 * Interface for user token payload
 */
interface IUserTokenPayload extends JwtPayload {
    //user information
    user: {
        //id from database
        _id: Types.ObjectId,
        //username
        username: string
    }
}

//export
export { IUser, ICustomRequest, IUserTokenPayload }