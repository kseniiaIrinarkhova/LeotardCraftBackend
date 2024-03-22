"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const main_1 = require("../types/main");
const rhinestoneSchema = new mongoose_1.Schema({
    created_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Property 'created_by' should be provided"]
    },
    type: {
        type: String,
        enum: [
            main_1.RhinestonesType.sew_on,
            main_1.RhinestonesType.hotfix,
            main_1.RhinestonesType.no_hotfix
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
exports.default = (0, mongoose_1.model)("Rhinestone", rhinestoneSchema);
