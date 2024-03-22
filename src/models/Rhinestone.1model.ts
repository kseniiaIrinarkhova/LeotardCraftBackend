import { Schema, Types, model } from 'mongoose';
import { IRhinestone, RhinestonesType } from '../types/main';

// /**Rhinestones Types */
// enum RhinestonesType {
//     sew_on = "Sew on",
//     hotfix = "HotFix",
//     no_hotfix = "No HotFix"
// }

// /**Interface for rhinestone */
// interface IRhinestone extends Document {
//     /**
//      * foreign key to user
//      */
//     created_by: Types.ObjectId;
//     /**
//          * Type of the rhinestone
//          */
//     type: RhinestonesType;
//     /**
//      * Information about rhinestones size
//      */
//     size: string;
//     /**
//      * Information about rhinestones color
//      */
//     color: string;
//     /**
//      * Additional links for resources
//      */
//     url?: Array<string>;
// }


const rhinestoneSchema = new Schema<IRhinestone>({
    created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Property 'created_by' should be provided"]
    },

    type: {
        type: String,
        enum: [
            RhinestonesType.sew_on,
            RhinestonesType.hotfix,
            RhinestonesType.no_hotfix
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
    }]
});

export default model<IRhinestone>("Rhinestone", rhinestoneSchema);