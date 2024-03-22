import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/error.util';
import * as rhinestoneServices from '../services/rhinestone.service';
import { ICustomRequest, IRhinestone, IUserTokenPayload } from '../types/main';

export default class RhinestoneController {
    /**
     * Create Rhinestone
     * @param req Request
     * @param res Response
     * @returns result of creation
     */
    async createRhinestone(req: ICustomRequest, res: Response) {
        try {
            const newRhinestone: IRhinestone = { created_by: (req.token as IUserTokenPayload).user._id, ...req.body }
            const rhinestone = await rhinestoneServices.createOne(newRhinestone);
            return res.status(201).json({ data: rhinestone , message: "Rhinestone has beed created." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }
    /**
     * Get all rhinestone for user
     * @param req Request
     * @param res Response
     * @returns result of creation
     */
    async getAllRhinestones(req: ICustomRequest, res: Response) {
        try {
            const userRhinestones = await rhinestoneServices.getAllRhinestoneByUserID((req.token as IUserTokenPayload).user._id);
            return res.status(200).json({ data: userRhinestones });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }



    /**
         * Get rhinstone information by ID
         * @param req Request with token data
         * @param res response
         * @returns rhinestone data
         */
    async getRhinestoneByID(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get id parameter
            const { id } = req.params;
            //get rhinestone data
            const rhinestone = await rhinestoneServices.getRhinestoneById(id)
            //return result
            return res.status(200).json({ data: rhinestone });
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
    async updateRhinestone(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get id parameter
            const { id } = req.params;
            //get rhinstone data
            const updatedRhinestone = await rhinestoneServices.updateRhinestone(req.body, id)
            //return updated user
            return res.status(200).send({ data: updatedRhinestone, message: "Rhinestone has been updated." });
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
    async deleteRhinestone(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get id parameter
            const { id } = req.params;
            //try to delete rhinstone and get information about deleted rhinstone
            const deletedRhinestone = await rhinestoneServices.deleteRhinestone(id) 
            //return information about deleted user
            return res.status(200).send({ data: deletedRhinestone, message: "Rhinestone has been deleted." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }
}