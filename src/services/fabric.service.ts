import { IFabric } from '../types/main';
import FabricModel from '../models/Fabric.model'
import { Types } from 'mongoose';

/**
 * Function that creates fabric document in db
 * @param fabric object
 * @returns object from db
 */
async function createOne(fabric: IFabric) {
    try {
        //try to create a new fabric in database
        const newFabric = await FabricModel.create(fabric);
        return newFabric;
    } catch (error) {
        throw error;
    }
}

/**
 * Function that gets all fabric documents created by user from db
 * @param created_by user ID
 * @returns array of fabric objects
 */
async function getAllFabricByUserID(created_by: Types.ObjectId) {
    try {
        //get all user's fabrics from database
        const result = await FabricModel.find({ created_by: created_by });
        //return list of object
        return result;
    } catch (err) {
        return err;
    }
}

/**
 * Function that gets fabric by ID from DB
 * @param id fabric ID
 * @returns fabric object
 */
async function getFabricById(id: string) {
    try {
        //get fabric data
        const result = await FabricModel.findById({ _id: id });
        //return list of object
        return result;
    } catch (err) {
        return err;
    }
}

/**
 * Function that changes data for fabric object with provided ID
 * @param changedData changed data
 * @param id fabric ID
 * @returns changed fabric object
 */
async function updateFabric(changedData: any, id: string) {
    try {
        //try to update fabric data
        const result = await FabricModel.findByIdAndUpdate({ _id: id }, changedData, { new: true });
        //return list of object
        return result;
    } catch (err) {
        return err;
    }
}

/**
 * Function that delete fabric document with provided ID from DB
 * @param id fabric ID
 * @returns result of action
 */
async function deleteFabric(id: string) {
    try {
        //try to update fabric data
        const result = await FabricModel.findByIdAndDelete({ _id: id });
        //return list of object
        return result;
    } catch (err) {
        return err;
    }
}

export { createOne, getAllFabricByUserID, getFabricById, updateFabric, deleteFabric };