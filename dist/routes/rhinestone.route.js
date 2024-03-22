"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rhinestone_controller_1 = __importDefault(require("../controllers/rhinestone.controller"));
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const rhinestoneController = new rhinestone_controller_1.default();
//route for rhinestone 
router.route('/:id')
    .get(auth_1.auth, rhinestoneController.getRhinestoneByID)
    .patch(auth_1.auth, rhinestoneController.updateRhinestone)
    .delete(auth_1.auth, rhinestoneController.deleteRhinestone);
//main route
router.route('/')
    .get(auth_1.auth, rhinestoneController.getAllRhinestones)
    .post(auth_1.auth, rhinestoneController.createRhinestone);
exports.default = router;
