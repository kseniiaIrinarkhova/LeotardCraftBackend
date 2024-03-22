"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const userController = new user_controller_1.default();
//route for user account
router.route('/account')
    .get(auth_1.auth, userController.getUserInfo)
    .patch(auth_1.auth, userController.updateUser)
    .delete(auth_1.auth, userController.deleteUser);
//user login route
router.post('/login', userController.loginOne);
//user registration route
router.post('/register', userController.registerOne);
exports.default = router;
