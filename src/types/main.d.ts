import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Types, Document, ObjectId, Date } from 'mongoose';
import FabricController from '../controllers/fabric.controller';

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
    type: RhinestonesType;
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

/**
 * Interface for Fabric model
 */
interface IFabric extends Document{
    /**
     * foreign key to user
     */
    created_by: Types.ObjectId;
    /**
         * Type of the fabric
         */
    type: string;
    /**
     * Information about fabric color
     */
    color: string;
    /**
     * Additional links for resources
     */
    links: { url: String }[];
}

/**
 * Interface for Project
 */
interface IProject extends Document{
    /**
         * foreign key to user
         */
    created_by: Types.ObjectId;
    /**
     * Project title
     */
    title: string;
    /**
     * The list of rhinestones and its amount that is used in project
     */
    rhinestones?: ProjectRhinestone[];
    /**
     * The list of fabrics and its amount that is used in project
     */
    fabrics?:ProjectFabric[];
    /**
     * additional notes related to project
     */
    notes: Note[];
}

/**
 * Type for rhinestones in project
 */
type ProjectRhinestone = {
    /**
         * foreign key to Rhinestone
         */
    rhinestone_id: Types.ObjectId; 
    /**
     * amount of rhinestones
     */
    amount: number;
    /**
     * additional notes related to rhinestone
     */
    notes: Note[];
}

/**
 * Type for fabrics in project
 */
type ProjectFabric = {
    /**
         * foreign key to Fabric
         */
    fabric_id: Types.ObjectId;
    /**
     * fabric quantity 
     */
    quantity: number;
    /**
     * additional notes related to fabric
     */
    notes: Note[];
}
/**
 * type for notes
 */
type Note = {
    /**
     * note context
     */
    context: string;
    /**
     * date when created
     */
    created_date: Date;
}
//export
export { IUser, ICustomRequest, IUserTokenPayload, UserUpdatedData, IRhinestone, RhinestonesType, IFabric, IProject }