import ProjectController from '../controllers/project.controller';
import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();
const projectController = new ProjectController();

//route for project 
router.route('/:id')
    .get(auth, projectController.getProjectByID)
    .patch(auth, projectController.updateProject)
    .delete(auth, projectController.deleteProject)



//main route
router.route('/')
    .get(auth, projectController.getAllProjects)
    .post(auth, projectController.createProject)

export default router;