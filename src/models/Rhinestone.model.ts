import { Model, ObjectId, Schema, Types, model } from 'mongoose';
import { IFilter, IRhinestone } from '../types/main';

interface IRhinestoneModel extends Model<IRhinestone>{
    findWithFilters(created_by: Types.ObjectId, filters: any): Promise<IRhinestone[]>;
    findByUserId(created_by: Types.ObjectId): Promise<IRhinestone[]>;
    findByType(created_by: Types.ObjectId, type: string): Promise<IRhinestone[]>;
    findByColor(created_by: Types.ObjectId, color: string): Promise<IRhinestone[]>;
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

//To search rhinestone related to selected user, added index that sort by created_by
rhinestoneSchema.index({ created_by: 1 });
//To search rhinestone related to selected user and specific type
rhinestoneSchema.index({ created_by: 1, type: 1 });
//To search rhinestone related to selected user and specific color
rhinestoneSchema.index({ created_by: 1, color: 1 });
//To search rhinestone related to selected user and specific size
rhinestoneSchema.index({ created_by: 1, size: 1 });

//get all rhinestones created by user
rhinestoneSchema.static('findByUserId', async function (created_by: Types.ObjectId): Promise<IRhinestone[]> {
    return this.find({ created_by: created_by });
})

//get all rhinestones created by user with specific type
rhinestoneSchema.static('findByType', async function (created_by: Types.ObjectId, type: string): Promise<IRhinestone[]> {
    return this.find({ created_by: created_by, type: { $regex: type, $options: "i" } });
})
//get all rhinestones created by user with specific color
rhinestoneSchema.static('findByColor', async function (created_by: Types.ObjectId, color: string): Promise<IRhinestone[]> {
    return this.find({ created_by: created_by, color: { $regex: color, $options: "i" } });
})
//get all rhinestones created by user with specific size
rhinestoneSchema.static('findBySize', async function (created_by: Types.ObjectId, size: string): Promise<IRhinestone[]> {
    return this.find({ created_by: created_by, size: { $regex: size, $options: "i" } });
})
//get all rhinestones created by user with specific color and type
rhinestoneSchema.static('findWithFilters', async function (created_by: Types.ObjectId, filters: any): Promise<IRhinestone> {
    const filter :IFilter = {created_by: created_by};
    filter.created_by = created_by
    for (const key in filters) {
        filter[key] = { $regex: filters[key], $options: "i" }
    }
    return this.find(filter);
})

const Rhinestone: IRhinestoneModel = model<IRhinestone, IRhinestoneModel>("Rhinestone", rhinestoneSchema);

export default Rhinestone;