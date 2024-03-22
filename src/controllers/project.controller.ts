import { Response } from 'express';
import { getErrorMessage } from '../utils/error.util';
import * as projectServices from '../services/project.service';
import { ICustomRequest, IProject, IUserTokenPayload } from '../types/main';

export default class ProjectController {
    /**
     * Create Project
     * @param req Request
     * @param res Response
     * @returns result of creation
     */
    async createProject(req: ICustomRequest, res: Response) {
        try {
            const newProject: IProject = { created_by: (req.token as IUserTokenPayload).user._id, ...req.body }
            const project = await projectServices.createOne(newProject);
            return res.status(201).json({ data: project, message: "Project has beed created." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }
    /**
     * Get all project for user
     * @param req Request
     * @param res Response
     * @returns result of creation
     */
    async getAllProjects(req: ICustomRequest, res: Response) {
        try {
            const userProjects = await projectServices.getAllProjectByUserID((req.token as IUserTokenPayload).user._id);
            return res.status(200).json({ data: userProjects });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }

    /**
         * Get rhinstone information by ID
         * @param req Request with token data
         * @param res response
         * @returns project data
         */
    async getProjectByID(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get id parameter
            const { id } = req.params;
            //get project data
            const project = await projectServices.getProjectById(id, (req.token as IUserTokenPayload).user._id)
            //return result
            return res.status(200).json({ data: project });
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
    async updateProject(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get id parameter
            const { id } = req.params;
            //get rhinstone data
            const updatedProject = await projectServices.updateProject(req.body, id, (req.token as IUserTokenPayload).user._id)
            //return updated user
            return res.status(200).send({ data: updatedProject, message: "Project has been updated." });
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
    async deleteProject(req: ICustomRequest, res: Response) {
        try {
            //check if we recieved token ( we have to, as we call this path afte auth middleware)
            if (!req.token) throw new Error("error with token")
            //get id parameter
            const { id } = req.params;
            //try to delete rhinstone and get information about deleted rhinstone
            const deletedProject = await projectServices.deleteProject(id, (req.token as IUserTokenPayload).user._id)
            //return information about deleted user
            return res.status(200).send({ data: deletedProject, message: "Project has been deleted." });
        } catch (err) {
            return res.status(500).json({ message: getErrorMessage(err) });
        }
    }
}