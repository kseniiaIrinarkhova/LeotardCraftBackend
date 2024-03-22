"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_util_1 = require("../utils/error.util");
const rhinestoneServices = __importStar(require("../services/rhinestone.service"));
class RhinestoneController {
    /**
     * Create Rhinestone
     * @param req Request
     * @param res Response
     * @returns result of creation
     */
    createRhinestone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRhinestone = Object.assign({ created_by: req.token.user._id }, req.body);
                const rhinestone = yield rhinestoneServices.createOne(newRhinestone);
                return res.status(201).json({ data: rhinestone, message: "Rhinestone has beed created." });
            }
            catch (err) {
                return res.status(500).json({ message: (0, error_util_1.getErrorMessage)(err) });
            }
        });
    }
    /**
     * Get all rhinestone for user
     * @param req Request
     * @param res Response
     * @returns result of creation
     */
    getAllRhinestones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userRhinestones = yield rhinestoneServices.getAllRhinestoneByUserID(req.token.user._id);
                return res.status(201).json({ data: userRhinestones, message: "User has beed created." });
            }
            catch (err) {
                return res.status(500).json({ message: (0, error_util_1.getErrorMessage)(err) });
            }
        });
    }
    /**
         * Get rhinstone information by ID
         * @param req Request with token data
         * @param res response
         * @returns rhinestone data
         */
    getRhinestoneByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if we recieved token ( we have to, as we call this path afte auth middleware)
                if (!req.token)
                    throw new Error("error with token");
                //get id parameter
                const { id } = req.params;
                //get rhinestone data
                const rhinestone = yield rhinestoneServices.getRhinestoneById(id);
                //return result
                return res.status(200).json({ data: rhinestone });
            }
            catch (err) {
                return res.status(500).json({ message: (0, error_util_1.getErrorMessage)(err) });
            }
        });
    }
    /**
     * Update rhinstone data
     * @param req request with token data
     * @param res resonse
     * @returns updated rhinstone data
     */
    updateRhinestone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if we recieved token ( we have to, as we call this path afte auth middleware)
                if (!req.token)
                    throw new Error("error with token");
                //get id parameter
                const { id } = req.params;
                //get rhinstone data
                const updatedRhinestone = yield rhinestoneServices.updateRhinestone(req.body, id);
                //return updated user
                return res.status(200).send({ data: updatedRhinestone, message: "Rhinestone has been updated." });
            }
            catch (err) {
                return res.status(500).json({ message: (0, error_util_1.getErrorMessage)(err) });
            }
        });
    }
    /**
     * Delete rhinstone
     * @param req request with token data
     * @param res resonse
     * @returns result of delete operation
     */
    deleteRhinestone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if we recieved token ( we have to, as we call this path afte auth middleware)
                if (!req.token)
                    throw new Error("error with token");
                //get id parameter
                const { id } = req.params;
                //try to delete rhinstone and get information about deleted rhinstone
                const deletedRhinestone = yield rhinestoneServices.deleteRhinestone(id);
                //return information about deleted user
                return res.status(200).send({ data: deletedRhinestone, message: "Rhinestone has been deleted." });
            }
            catch (err) {
                return res.status(500).json({ message: (0, error_util_1.getErrorMessage)(err) });
            }
        });
    }
}
exports.default = RhinestoneController;
