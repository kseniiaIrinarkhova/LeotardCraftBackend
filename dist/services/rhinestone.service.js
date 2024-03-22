"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRhinestone = exports.updateRhinestone = exports.getRhinestoneById = exports.getAllRhinestoneByUserID = exports.createOne = void 0;
const Rhinestone_model_1 = __importDefault(require("../models/Rhinestone.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createOne(rhinestone) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //try to create a new user in database
            return yield Rhinestone_model_1.default.create(rhinestone);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.createOne = createOne;
function getAllRhinestoneByUserID(created_by) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //get all user's rhinestones from database
            const result = yield Rhinestone_model_1.default.find({ created_by: created_by });
            //return list of object
            return result;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getAllRhinestoneByUserID = getAllRhinestoneByUserID;
function getRhinestoneById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //get rhinestone data
            const result = yield Rhinestone_model_1.default.findById({ _id: id });
            //return list of object
            return result;
        }
        catch (err) {
            return err;
        }
    });
}
exports.getRhinestoneById = getRhinestoneById;
function updateRhinestone(changedData, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //try to update rhinestone data
            const result = yield Rhinestone_model_1.default.findByIdAndUpdate({ _id: id }, changedData, { new: true });
            //return list of object
            return result;
        }
        catch (err) {
            return err;
        }
    });
}
exports.updateRhinestone = updateRhinestone;
function deleteRhinestone(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //try to update rhinestone data
            const result = yield Rhinestone_model_1.default.findByIdAndDelete({ _id: id });
            //return list of object
            return result;
        }
        catch (err) {
            return err;
        }
    });
}
exports.deleteRhinestone = deleteRhinestone;
