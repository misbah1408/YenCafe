// routes/adminRouter.js
import { Router } from 'express';
import { getAllOrders, getAllUsers } from '../controllers/UserAmin.controller.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
import authenticateToken from '../middlewares/auth.middleware.js';

const adminRouter = Router();

adminRouter.route('/users').get(authenticateToken, adminMiddleware, getAllUsers);
adminRouter.route('/orderdata').get(authenticateToken, adminMiddleware, getAllOrders);

export default adminRouter;
