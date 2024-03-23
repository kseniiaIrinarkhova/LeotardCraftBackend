import { IProject } from '../types/main';
import ProjectModel from '../models/Project.model'
import { Types } from 'mongoose';

/**
 * Function that creates project document in db
 * @param project object
 * @returns object from db
 */
async function createOne(project: IProject) {
    //try to create a new project in database
    const newProject = await ProjectModel.create(project);
    return newProject;
}

/**
 * Function that gets all project documents created by user from db
 * @param created_by user ID
 * @returns array of project objects
 */
async function getAllProjectByUserID(created_by: Types.ObjectId) {
    //get all user's projects from database
    const result = await ProjectModel.find({ created_by: created_by });
    //return list of object
    return result;
}

/**
 * Function that gets project by ID from DB
 * @param id project ID
 * @returns project object
 */
async function getProjectById(id: string, created_by: Types.ObjectId) {
    //get project data
    const result = await ProjectModel.findOne({ _id: id, created_by: created_by });
    //if there is no such project
    if (result === null) throw new Error(`Error GET. Current user did not create project with ID = ${id}`)
    //return list of object
    return result;
}

/**
 * Function that changes data for project object with provided ID
 * @param changedData changed data
 * @param id project ID
 * @param created_by user ID (user that try to update)
 * @returns changed project object
 */
async function updateProject(changedData: any, id: string, created_by: Types.ObjectId) {
    //try to update project data
    const result = await ProjectModel.findOneAndUpdate({ _id: id, created_by: created_by }, changedData, { new: true });
    //if there is no such project or it is created by different user - throw error
    if (result === null) throw new Error(`Error PATCH. Current user did not create project with ID = ${id}`)
    //return list of object
    return result;
}

/**
 * Function that delete project document with provided ID from DB
 * @param id project ID
 * @param created_by user ID (user that try to update)
 * @returns result of action
 */
async function deleteProject(id: string, created_by: Types.ObjectId) {
    //try to update project data
    const result = await ProjectModel.findOneAndDelete({ _id: id, created_by: created_by });
    //if there is no such project or it is created by different user - throw error
    if (result === null) throw new Error(`Error DELETE. Current user did not create project with ID = ${id}`)
    //return list of object
    return result;
}

export { createOne, getAllProjectByUserID, getProjectById, updateProject, deleteProject };