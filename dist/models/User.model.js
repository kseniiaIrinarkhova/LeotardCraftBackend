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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Username should not be empty!"],
        unique: true,
        immutable: true //to avoid possibility of field update
    },
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: [true, "Email should not be empty!"],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
//hash password before saving it to DB while creating user
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified('password')) {
            user.password = yield bcrypt_1.default.hash(user.password, saltRounds);
        }
        next();
    });
});
//hash password before updating
userSchema.pre('findOneAndUpdate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        //get updated data
        const updData = this.getUpdate();
        //if password is supposed to be changed 
        if (updData.password) {
            //change it to hash
            updData.password = yield bcrypt_1.default.hashSync(updData.password, saltRounds);
        }
        next();
    });
});
exports.default = (0, mongoose_1.model)("User", userSchema);
