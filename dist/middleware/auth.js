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
exports.auth = exports.jwtKey = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.jwtKey = process.env.JWT_TOKEN_KEY || 'Secret';
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get token from the header
        const token = req.header('x-auth-token');
        //check if there is not a token
        if (!token) {
            return res.status(401).json({ errors: [{ message: "No token, auth denied" }] });
        }
        //verify if token is valid
        const decoded = jsonwebtoken_1.default.verify(token, exports.jwtKey);
        req.token = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({ errors: [err, { message: "Token is not valid" }] });
    }
});
exports.auth = auth;
