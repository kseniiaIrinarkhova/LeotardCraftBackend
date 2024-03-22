import { Response } from 'express';
import { getErrorMessage } from '../utils/error.util';
import * as fabricServices from '../services/fabric.service';
import { ICustomRequest, IFabric, IUserTokenPayload } from '../types/main';
import { Types } from 'mongoose';

export default class FabricController {
    /**
     * Create Fabric
     * @param req Request
     * @param res Response
     * @returns result of creation
     */
    async createFabric(req: ICustomRequest, res: Response) {
        try {
            const newFabric: IFabric = { created_by: (req.token as IUserTokenPayload).user._id, ...req.body }
            const fabric = await fabricServices.createOne(newFabric);
            return res.status(201).json({ data: fabric, message: "Fabric has beed created." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }
    /**
     * Get all fabric for user
     * @param req Request
     * @param res Response
     * @returns result of creation
     */
    async getAllFabrics(req: ICustomRequest, res: Response) {
        try {
            //check query parameters
            const type = req.query["type"] as string;
            const color = req.query["color"] as string;

            let userFabrics: (IFabric & { _id: Types.ObjectId; })[];
            if (!type && !color)
                userFabrics = await fabricServices.getAllFabricByUserID((req.token as IUserTokenPayload).user._id);
            else
                userFabrics = await fabricServices.getFabricsWithFilters((req.token as IUserTokenPayload).user._id, type, color)
            return res.status(200).json({ data: userFabrics });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
         * Get fabric information by ID
         * @param req Request with token data
         * @param res response
         * @returns fabric data
         */
    async getFabricByID(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get id parameter
            const { id } = req.params;
            //get fabric data
            const fabric = await fabricServices.getFabricById(id)
            //return result
            return res.status(200).json({ data: fabric });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
     * Update fabric data
     * @param req request with token data
     * @param res resonse
     * @returns updated fabric data 
     */
    async updateFabric(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get id parameter
            const { id } = req.params;
            //get fabric data
            const updatedFabric = await fabricServices.updateFabric(req.body, id, (req.token as IUserTokenPayload).user._id)
            //return updated user
            return res.status(200).send({ data: updatedFabric, message: "Fabric has been updated." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
     * Delete fabric
     * @param req request with token data
     * @param res resonse
     * @returns result of delete operation
     */
    async deleteFabric(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get id parameter
            const { id } = req.params;
            //try to delete fabric and get information about deleted fabric
            const deletedFabric = await fabricServices.deleteFabric(id, (req.token as IUserTokenPayload).user._id)
            //return information about deleted user
            return res.status(200).send({ data: deletedFabric, message: "Fabric has been deleted." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
     * Get all fabric with specific type
     * @param req request with token data
     * @param res resonse
     * @returns result of delete operation
     */
    async getFabricByType(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get type parameter
            const { type } = req.params;
            //try to get fabric with this type
            const result = await fabricServices.getFabricsByType((req.token as IUserTokenPayload).user._id, type);
            return res.status(200).send({ data: result });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }
    /**
    * Get all fabric with specific color
    * @param req request with token data
    * @param res resonse
    * @returns result of delete operation
    */
    async getFabricByColor(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get color parameter
            const { color } = req.params;
            //try to get fabric with this type
            const result = await fabricServices.getFabricsByColor((req.token as IUserTokenPayload).user._id, color);
            return res.status(200).send({ data: result });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }
}