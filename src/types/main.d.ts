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

type UserUpdatedData = {
    username?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string
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

/**Rhinestones Types: "Sew-on", "HotFix", "No-HotFix" */
enum RhinestonesType {
    sew_on = 'Sew on',
    hotfix = 'HotFix',
    no_hotfix = 'No HotFix'
}

/**Interface for rhinestone */
interface IRhinestone extends Document{
    /**
     * foreign key to user
     */
    created_by: Types.ObjectId;
    /**
         * Type of the rhinestone
         */
    type: string;
    /**
     * Information about rhinestones size
     */
    size: string;
    /**
     * Information about rhinestones color
     */
    color: string;
    /**
     * Additional links for resources
     */
    links: {url: String}[];
}


//export
export { IUser, ICustomRequest, IUserTokenPayload, UserUpdatedData, IRhinestone, RhinestonesType }