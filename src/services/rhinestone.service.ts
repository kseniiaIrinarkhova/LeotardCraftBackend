import { IRhinestone } from '../types/main';
import RhinestoneModel from '../models/Rhinestone.model'
import { Types } from 'mongoose';





async function createOne(rhinestone: IRhinestone) {
    try {
        //try to create a new user in database
        const newRhinestone = await RhinestoneModel.create(rhinestone);
        return newRhinestone;
    } catch (error) {
        throw error;
    }
}


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