import FabricController from '../controllers/fabric.controller';
import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();
const fabricController = new FabricController();

//route for specific fabric 
router.route('/:id')
    .get(auth, fabricController.getFabricByID)
    .patch(auth, fabricController.updateFabric)
    .delete(auth, fabricController.deleteFabric)



//main route
router.route('/')
    .get(auth, fabricController.getAllFabrics)
    .post(auth, fabricController.createFabric)

//specific search routes
router.get('/types/:type', auth, fabricController.getFabricByType)
router.get('/colors/:color', auth, fabricController.getFabricByColor)

export default router;