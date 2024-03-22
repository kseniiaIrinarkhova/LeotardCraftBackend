import { Model, Schema, model } from 'mongoose';
import { IFabric } from '../types/main';

interface IFabricModel extends Model<IFabric> {

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

const Fabric: IFabricModel = model<IFabric, IFabricModel>("Fabric", fabricSchema);

export default Fabric;