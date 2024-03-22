import FabricController from '../controllers/fabric.controller';
import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();
const fabricController = new FabricController();

//route for fabric 
router.route('/:id')
    .get(auth, fabricController.getFabricByID)
    .patch(auth, fabricController.updateFabric)
    .delete(auth, fabricController.deleteFabric)



//main route
router.route('/')
    .get(auth, fabricController.getAllFabrics)
    .post(auth, fabricController.createFabric)

export default router;