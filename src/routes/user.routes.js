import express from 'express';
import { loginController } from '../controller/login.controller.js';
import { registerUser } from '../controller/register.controller.js';
import { refreshController } from '../controller/refresh.controller.js';
import { logout } from '../controller/logout.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { changeRoles, getAllUsers, getProfile } from '../controller/user.controller.js';
import { authorizeRoles } from '../middlewares/roles.middleware.js';
import { roles } from '../constants/role.js';


const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginController);
userRoutes.post('/refresh', refreshController);
userRoutes.post('/logout', logout);

userRoutes.get('/me', authenticate, getProfile);

// Admin only get all users
userRoutes.get('/', authenticate, authorizeRoles(roles.Admin), getAllUsers);

// Admin only change the roles
userRoutes.post('/change-role', authenticate, authorizeRoles(roles.Admin), changeRoles);

export default userRoutes;