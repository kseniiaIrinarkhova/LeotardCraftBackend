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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.login = exports.register = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //try to create a new user in database
            yield User_model_1.default.create(user);
        }
        catch (error) {
            throw error;
        }
    });
}
exports.register = register;
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            //try to find requested username
            const foundUser = yield User_model_1.default.findOne({ username: user.username });
            //there is no such user in database
            if (!foundUser)
                throw new Error("Invalid Credentials");
            //compare requested password with hashed one in database
            const isMatch = bcrypt_1.default.compareSync(user.password, foundUser.password);
            //if match - return user info and token
            if (isMatch) {
                //create payload with user ID and username information
                const payload = {
                    user: {
                        _id: (_a = foundUser._id) === null || _a === void 0 ? void 0 : _a.toString(),
                        username: foundUser.username
                    }
                };
                //create token that would expire in 2 days
                const token = jsonwebtoken_1.default.sign(payload, auth_1.jwtKey, {
                    expiresIn: '2 days',
                });
                //return jws token with paylod
                return { token: token };
            }
            //else throw an error
            throw new Error("Invalid Credentials");
        }
        catch (error) {
            throw error;
        }
    });
}
exports.login = login;
/**
 * Function that returns user data by ID
 * @param id user id
 * @returns user data without password
 */
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //try to find requested user
            const foundUser = yield User_model_1.default.findOne({ _id: id }).select('-password');
            //there is no such user in database
            if (!foundUser)
                throw new Error("Oops, some issue with getting user data");
            return foundUser;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getUserById = getUserById;
/**
 * Function that update user data
 * @param changedData data from request body
 * @param id user id
 * @returns user data without password
 */
function updateUser(changedData, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //try to get user by id and change it
            const updatedUser = yield User_model_1.default.findByIdAndUpdate({ _id: id }, changedData, { new: true }).select('-password');
            if (!updatedUser) {
                throw new Error("Requested User not found!");
            }
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.updateUser = updateUser;
/**
 * Function that delete user from DB
 * @param id user id
 * @returns user data without password
 */
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //try to delete user by ID
            const deletedUser = yield User_model_1.default.findByIdAndDelete({ _id: id }).select('-password');
            if (!deletedUser) {
                throw new Error("Requested User not found!");
            }
            return deletedUser;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.deleteUser = deleteUser;
