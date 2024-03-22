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
const userServices = __importStar(require("../services/user.service"));
class UserController {
    //CRUD operations for User
    /**
     * Create User in database
     * @param req Request
     * @param res Response
     * @returns result of user registration
     */
    registerOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userServices.register(req.body);
                return res.status(201).json({ data: "new user", message: "User has beed created." });
            }
            catch (err) {
                return res.status(500).json({ message: (0, error_util_1.getErrorMessage)(err) });
            }
        });
    }
    /**
     * Login by User
     * @param req Request
     * @param res Response
     * @returns result of login attempt
     */
    loginOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield userServices.login(req.body);
                res.status(200).json({ data: token });
            }
            catch (err) {
                return res.status(500).json({ message: (0, error_util_1.getErrorMessage)(err) });
            }
        });
    }
    /**
         * Get user information by ID
         * @param req Request with token data
         * @param res response
         * @returns user data without password
         */
    getUserInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if we recieved token ( we have to, as we call this path afte auth middleware)
                if (!req.token)
                    throw new Error("error with token");
                //get user data
                const user = yield userServices.getUserById(req.token.user._id);
                //return result
                return res.status(200).json({ data: user });
            }
            catch (err) {
                return res.status(500).json({ message: (0, error_util_1.getErrorMessage)(err) });
            }
        });
    }
    /**
     * Update user data
     * @param req request with token data
     * @param res response
     * @returns updated user data without password
     */
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if we recieved token ( we have to, as we call this path afte auth middleware)
                if (!req.token)
                    throw new Error("error with token");
                //get user data
                const updatedUser = yield userServices.updateUser(req.body, req.token.user._id);
                //return updated user
                return res.status(200).send({ data: updatedUser, message: "User has been updated." });
            }
            catch (err) {
                return res.status(500).json({ message: (0, error_util_1.getErrorMessage)(err) });
            }
        });
    }
    /**
     * Delete user
     * @param req request with token data
     * @param res response
     * @returns
     */
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //check if we recieved token ( we have to, as we call this path afte auth middleware)
                if (!req.token)
                    throw new Error("error with token");
                //try to delete user and get information about deleted user
                const deletedUser = yield userServices.deleteUser(req.token.user._id);
                //return information about deleted user
                return res.status(200).send({ data: deletedUser, message: "User has been deleted." });
            }
            catch (err) {
                return res.status(500).json({ message: (0, error_util_1.getErrorMessage)(err) });
            }
        });
    }
}
exports.default = UserController;
