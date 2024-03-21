import UserController from '../controllers/user.controller';
import express from 'express';
import { auth } from '../middleware/auth';

const router = express.Router();
const userController = new UserController();

//route for user account
router.route('/account')
.get(auth, userController.getUserInfo)
.patch(auth, userController.updateUser)
.delete(auth, userController.deleteUser)

//user login route
router.post('/login', userController.loginOne);
//user registration route
router.post('/register', userController.registerOne);





export default router;