import { IRhinestone } from '../types/main';
import RhinestoneModel from '../models/Rhinestone.model'
import { Types } from 'mongoose';




/**
 * Function that creates rhinestone document in db
 * @param rhinestone object
 * @returns object from db
 */
async function createOne(rhinestone: IRhinestone) {
    try {
        //try to create a new rhinestone in database
        const newRhinestone = await RhinestoneModel.create(rhinestone);
        return newRhinestone;
    } catch (error) {
        throw error;
    }
}

/**
 * Function that gets all rhinestone documents created by user from db
 * @param created_by user ID
 * @returns array of rhinestone objects
 */
async function getAllRhinestoneByUserID(created_by: Types.ObjectId) {
    try {
        //get all user's rhinestones from database
        const result = await RhinestoneModel.find({ created_by: created_by });
        //return list of object
        return result ;
    } catch (err) {
        return err;
    }
}

/**
 * Function that gets rhinestone by ID from DB
 * @param id rhinestone ID
 * @returns rhinestone object
 */
async function getRhinestoneById(id: string) {
    try {
        //get rhinestone data
        const result = await RhinestoneModel.findById({ _id: id });
        //return list of object
        return result;
    } catch (err) {
        return err;
    }
}

/**
 * Function that changes data for rhinestone object with provided ID
 * @param changedData changed data
 * @param id rhinestone ID
 * @returns changed rhinestone object
 */
async function updateRhinestone(changedData: any, id: string) {
    try {
        //try to update rhinestone data
        const result = await RhinestoneModel.findByIdAndUpdate({ _id: id }, changedData, { new: true });
        //return list of object
        return result;
    } catch (err) {
        return err;
    }
}

/**
 * Function that delete rhinestone document with provided ID from DB
 * @param id rhinestone ID
 * @returns result of action
 */
async function deleteRhinestone(id: string) {
    try {
        //try to update rhinestone data
        const result = await RhinestoneModel.findByIdAndDelete({ _id: id });
        //return list of object
        return result;
    } catch (err) {
        return err;
    }
}

export { createOne, getAllRhinestoneByUserID, getRhinestoneById, updateRhinestone, deleteRhinestone };