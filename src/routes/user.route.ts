import UserController from '../controllers/user.controller';
import express from 'express';

const router = express.Router();
const userController = new UserController();

//user login route
router.post('/login', userController.loginOne);
//user registration route
router.post('/register', userController.registerOne);





export default router;