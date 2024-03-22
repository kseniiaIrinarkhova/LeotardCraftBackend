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

const Rhinestone: IRhinestoneModel = model<IRhinestone, IRhinestoneModel>("Rhinestone", rhinestoneSchema);

export default Rhinestone;