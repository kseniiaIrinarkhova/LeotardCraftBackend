import { Model, Schema, model } from 'mongoose';
import { IRhinestone } from '../types/main';

interface IRhinestoneModel extends Model<IRhinestone>{

}

const rhinestoneSchema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Property 'created_by' should be provided"]
    },

    type: {
        type: String,
        enum: [
            'Sew on',
            'HotFix',
            'No HotFix'
        ],
        required: [true, "Property 'type' should be provided"]
    },

    size: {
        type: String,
        required: [true, "Property 'size' should be provided"]
    },

    color: {
        type: String,
        required: [true, "Property 'color' should be provided"]
    },

    url: [{
        link: {
            type: String,
            required: [true, "Property 'link' should be provided"]
        }
    }],
});

const Rhinestone: IRhinestoneModel = model<IRhinestone, IRhinestoneModel>("Rhinestone", rhinestoneSchema);

export default Rhinestone;