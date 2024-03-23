import { IFabric } from '../types/main';
import FabricModel from '../models/Fabric.model'
import { Types } from 'mongoose';

/**
 * Function that creates fabric document in db
 * @param fabric object
 * @returns object from db
 */
async function createOne(fabric: IFabric) {
        //try to create a new fabric in database
        const newFabric = await FabricModel.create(fabric);
        return newFabric;
}

/**
 * Function that gets all fabric documents created by user from db
 * @param created_by user ID
 * @returns array of fabric objects
 */
async function getAllFabricByUserID(created_by: Types.ObjectId) {
        //get all user's fabrics from database
        const result = await FabricModel.findByUserId(created_by);
        //return list of object
        return result;
}

/**
 * Function that gets fabric by ID from DB
 * @param id fabric ID
 * @returns fabric object
 */
async function getFabricById(id: string) {
        //get fabric data
        const result = await FabricModel.findById({ _id: id });
        //if there is no such fabric
        if (result === null) throw new Error(`Error GET. There is no fabric with ID = ${id}`)
        //return list of object
        return result;
}

/**
 * Function that changes data for fabric object with provided ID
 * @param changedData changed data
 * @param id fabric ID
 * @param created_by user ID (user that try to update)
 * @returns changed fabric object
 */
async function updateFabric(changedData: any, id: string, created_by: Types.ObjectId) {
        //try to update fabric data
        const result = await FabricModel.findOneAndUpdate({ _id: id, created_by: created_by }, changedData, { new: true });
        //if there is no such fabric or it is created by different user - throw error
        if (result === null) throw new Error(`Error PATCH. Current user did not create fabric with ID = ${id}`)
        //return list of object
        return result;
}

/**
 * Function that delete fabric document with provided ID from DB
 * @param id fabric ID
 * @param created_by user ID (user that try to update)
 * @returns result of action
 */
async function deleteFabric(id: string, created_by: Types.ObjectId) {
        //try to update fabric data
        const result = await FabricModel.findOneAndDelete({ _id: id, created_by: created_by });
        //if there is no such fabric or it is created by different user - throw error
        if (result === null) throw new Error(`Error DELETE. Current user did not create fabric with ID = ${id}`)
        //return list of object
        return result;
}

/**
 * Function that finds fabric document with provided color from DB
 * @param created_by user ID (user that try to update)
 * @param color Fabric color
 * @returns result of action
 */
async function getFabricsByColor(created_by: Types.ObjectId, color: string) {
        //try to find fabrics created by user with provided color
        const result = await FabricModel.findByColor(created_by, color);
        //return list of object
        return result;
}

/**
 * Function that finds fabric document with provided type from DB
 * @param created_by user ID (user that try to update) 
 * @param type fabric type
 * @returns result of action
 */
async function getFabricsByType(created_by: Types.ObjectId, type: string) {
        //try to get fabric data
        const result = await FabricModel.findByType(created_by, type)
        //return list of object
        return result;
}

/**
 * Function that finds fabric document with provided filters
 * @param created_by user ID (user that try to update)
 * @param type fabric type
 * @param color Fabric color
 * @returns result of action
 */
async function getFabricsWithFilters(created_by: Types.ObjectId, type: string, color: string) {
        if (type && color) return await FabricModel.findByTypeAndColor(created_by, type, color);
        if (type) return await FabricModel.findByType(created_by, type);
        if (color) return await FabricModel.findByColor(created_by, color);
        return await FabricModel.findByUserId(created_by);
}

export { createOne, getAllFabricByUserID, getFabricById, updateFabric, deleteFabric, getFabricsByColor, getFabricsByType, getFabricsWithFilters };