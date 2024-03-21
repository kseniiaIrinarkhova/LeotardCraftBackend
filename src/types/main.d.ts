import { Types, Document } from 'mongoose';

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



//export
export {IUser}