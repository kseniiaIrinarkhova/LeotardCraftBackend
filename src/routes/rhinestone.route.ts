import RhinestoneController from '../controllers/rhinestone.controller';
import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();
const rhinestoneController = new RhinestoneController();

//route for rhinestone 
router.route('/:id')
    .get(auth, rhinestoneController.getRhinestoneByID)
    .patch(auth, rhinestoneController.updateRhinestone)
    .delete(auth, rhinestoneController.deleteRhinestone)



//main route
router.route('/')
    .get(auth, rhinestoneController.getAllRhinestones)
    .post(auth,rhinestoneController.createRhinestone)

//specific search routes
router.get('/types/:type', auth, rhinestoneController.getRhinestoneByType)
router.get('/colors/:color', auth, rhinestoneController.getRhinestoneByColor)
router.get('/sizes/:size', auth, rhinestoneController.getRhinestoneBySize)
export default router;