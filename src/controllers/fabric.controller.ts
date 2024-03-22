import {  Response } from 'express';
import { getErrorMessage } from '../utils/error.util';
import * as fabricServices from '../services/fabric.service';
import { ICustomRequest, IFabric, IUserTokenPayload } from '../types/main';

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
            const userFabrics = await fabricServices.getAllFabricByUserID((req.token as IUserTokenPayload).user._id);
            return res.status(200).json({ data: userFabrics });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
         * Get rhinstone information by ID
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
     * Update rhinstone data
     * @param req request with token data
     * @param res resonse
     * @returns updated rhinstone data 
     */
    async updateFabric(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get id parameter
            const { id } = req.params;
            //get rhinstone data
            const updatedFabric = await fabricServices.updateFabric(req.body, id)
            //return updated user
            return res.status(200).send({ data: updatedFabric, message: "Fabric has been updated." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
     * Delete rhinstone
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
            //try to delete rhinstone and get information about deleted rhinstone
            const deletedFabric = await fabricServices.deleteFabric(id)
            //return information about deleted user
            return res.status(200).send({ data: deletedFabric, message: "Fabric has been deleted." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }
}