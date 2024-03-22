import { Model, Schema, model } from 'mongoose';
import { IProject } from '../types/main';

interface IProjectModel extends Model<IProject> {

}

const projectSchema = new Schema({
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Property 'created_by' should be provided"]
    },

    title: {
        type: String,
        required: [true, "Property 'title' should be provided"]
    },

    rhinestones:[
        {
            rhinestone_id: {
                type: Schema.Types.ObjectId,
                ref: 'Rhinestone',
                required: [true, "Property 'rhinestone_id' should be provided"]
            },
            amount:{
                type: Number,
                default : 0
            },
            notes: [
                {
                    context: {
                        type: String,
                        required: [true, "Property 'context' should be provided"]
                    },
                    created_date :{
                        type: Date,
                        required: [true, "Property 'created_date' should be provided"]
                    }
            }
        ],
        }
    ],
    fabrics: [
        {
            fabric_id: {
                type: Schema.Types.ObjectId,
                ref: 'Fabric',
                required: [true, "Property 'fabric_id' should be provided"]
            },
            quantity: {
                type: Number,
                default: 0
            },
            notes: [
                {
                    context: {
                        type: String,
                        required: [true, "Property 'context' should be provided"]
                    },
                    created_date: {
                        type: Date,
                        required: [true, "Property 'created_date' should be provided"]
                    }
                }
            ],
        }
    ],
    notes: [
        {
            context: {
                type: String,
                required: [true, "Property 'context' should be provided"]
            },
            created_date: {
                type: Date,
                required: [true, "Property 'created_date' should be provided"]
            }
        }
    ],
    imgs: [{
        url: {
            type: String,
            required: [true, "Property 'url' should be provided for images"]
        }
    }],
});

const Project: IProjectModel = model<IProject, IProjectModel>("Project", projectSchema);

export default Project;