import { IRhinestone } from '../types/main';
import RhinestoneModel from '../models/Rhinestone.model'
import { Types } from 'mongoose';

/**
 * Function that creates rhinestone document in db
 * @param rhinestone object
 * @returns object from db
 */
async function createOne(rhinestone: IRhinestone) {
    //try to create a new rhinestone in database
    const newRhinestone = await RhinestoneModel.create(rhinestone);
    return newRhinestone;
}

/**
 * Function that gets all rhinestone documents created by user from db
 * @param created_by user ID
 * @returns array of rhinestone objects
 */
async function getAllRhinestoneByUserID(created_by: Types.ObjectId) {
    //get all user's rhinestones from database
    const result = await RhinestoneModel.find({ created_by: created_by });
    //return list of object
    return result;
}

/**
 * Function that gets rhinestone by ID from DB
 * @param id rhinestone ID
 * @returns rhinestone object
 */
async function getRhinestoneById(id: string) {
    //get rhinestone data
    const result = await RhinestoneModel.findById({ _id: id });
    //if there is no such rhinestone
    if (result === null) throw new Error(`Get error. There is no rhinestone with ID = ${id}`)
    //return list of object
    return result;
}

/**
 * Function that changes data for rhinestone object with provided ID
 * @param changedData changed data
 * @param id rhinestone ID
 * @param created_by user ID (user that try to update)
 * @returns changed rhinestone object
 */
async function updateRhinestone(changedData: any, id: string, created_by: Types.ObjectId) {
    //try to update rhinestone data
    const result = await RhinestoneModel.findOneAndUpdate({ _id: id, created_by: created_by }, changedData, { new: true });
    //if there is no such rhinestone or it is created by different user - throw error
    if (result === null) throw new Error(`Update error. Current user did not create rhinestone with ID = ${id}`)
    //return updated object
    return result;
}

/**
 * Function that delete rhinestone document with provided ID from DB
 * @param id rhinestone ID
 * @param created_by user ID (user that try to update)
 * @returns result of action
 */
async function deleteRhinestone(id: string, created_by: Types.ObjectId) {
    //try to update rhinestone data
    const result = await RhinestoneModel.findOneAndDelete({ _id: id, created_by: created_by });
    //if there is no such rhinestone or it is created by different user - throw error
    if (result === null) throw new Error(`Delete error. Current user did not create rhinestone with ID = ${id}`)
    //return list of object
    return result;
}
/**
 * Function that finds rhinestone document with provided color from DB
 * @param created_by user ID (user that try to update)
 * @param color Rhinestone color
 * @returns result of action
 */
async function getRhinestonesByColor(created_by: Types.ObjectId, color: string) {
    //try to find rhinestones created by user with provided color
    const result = await RhinestoneModel.findByColor(created_by, color);
    //return list of object
    return result;
}

/**
 * Function that finds rhinestone document with provided type from DB
 * @param created_by user ID (user that try to update) 
 * @param type rhinestone type
 * @returns result of action
 */
async function getRhinestonesByType(created_by: Types.ObjectId, type: string) {
    //try to get rhinestone data
    const result = await RhinestoneModel.findByType(created_by, type)
    //return list of object
    return result;
}

/**
 * Function that finds rhinestone document with provided filters
 * @param created_by user ID (user that try to update)
 * @param type rhinestone type
 * @param color Rhinestone color
 * @returns result of action
 */
async function getRhinestonesWithFilters(created_by: Types.ObjectId, type: string = '', color: string = '', size: string = '') {
    //create filter object
    let filters = {
        type: type,
        color: color,
        size: size
    }
    return await RhinestoneModel.findWithFilters(created_by, filters);

}

export { createOne, getAllRhinestoneByUserID, getRhinestoneById, updateRhinestone, deleteRhinestone, getRhinestonesByColor, getRhinestonesByType, getRhinestonesWithFilters };