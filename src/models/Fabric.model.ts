import { Model, Schema, Types, model } from 'mongoose';
import { IFabric } from '../types/main';

interface IFabricModel extends Model<IFabric> {
    findByTypeAndColor(created_by: Types.ObjectId, type: string, color: string): Promise<(IFabric & { _id: Types.ObjectId; })[]>;
    findByUserId(created_by: Types.ObjectId): Promise<(IFabric & { _id: Types.ObjectId; })[]>;
    findByType(created_by: Types.ObjectId, type: string): Promise<(IFabric & { _id: Types.ObjectId; })[]>;
    findByColor(created_by: Types.ObjectId, color: string): Promise<(IFabric & { _id: Types.ObjectId; })[]>;
}

const fabricSchema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Property 'created_by' should be provided"]
    },

    type: {
        type: String,
        required: [true, "Property 'type' should be provided"]
    },

    color: {
        type: String,
        required: [true, "Property 'color' should be provided"]
    },

    links: [{
        url: {
            type: String,
            required: [true, "Property 'url' should be provided for links"]
        }
    }],
    imgs: [{
        url: {
            type: String,
            required: [true, "Property 'url' should be provided for images"]
        }
    }],
});

//To search fabric related to selected user, added index that sort by created_by
fabricSchema.index({ created_by: 1 }); 
//To search fabric related to selected user and specific type
fabricSchema.index({ created_by: 1, type: 1 });
//To search fabric related to selected user and specific color
fabricSchema.index({ created_by: 1, color : 1 });  

//get all fabrics created by user
fabricSchema.static('findByUserId', async function (created_by: Types.ObjectId): Promise<(IFabric & { _id: Types.ObjectId; })[]> {
    return this.find({ created_by: created_by });
})

//get all fabrics created by user with specific type
fabricSchema.static('findByType', async function (created_by: Types.ObjectId, type: string): Promise<(IFabric & { _id: Types.ObjectId; })[]> {
    return this.find({ created_by: created_by, type: { $regex: type, $options: "i" } });
})
//get all fabrics created by user with specific color
fabricSchema.static('findByColor', async function (created_by: Types.ObjectId, color: string): Promise<(IFabric & { _id: Types.ObjectId; })[]> {
    return this.find({ created_by: created_by, color: { $regex: color, $options: "i" } });
})
//get all fabrics created by user with specific color and type
fabricSchema.static('findByTypeAndColor', async function (created_by: Types.ObjectId, type: string, color: string): Promise<(IFabric & { _id: Types.ObjectId; })[]> {
    return this.find({ created_by: created_by, type: { $regex: type, $options: "i" } , color: { $regex: color, $options: "i" } });
})

const Fabric: IFabricModel = model<IFabric, IFabricModel>("Fabric", fabricSchema);

export default Fabric;