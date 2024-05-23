// routes/adminRouter.js
import { Router } from 'express';
import { getAllOrders, getAllUsers, deleteUserById, getUserById, deliveredUpdate } from '../controllers/UserAmin.controller.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
import authenticateToken from '../middlewares/auth.middleware.js';

const adminRouter = Router();

adminRouter.route('/users').get(authenticateToken, adminMiddleware, getAllUsers);
adminRouter.route('/orderdata').get(authenticateToken, adminMiddleware, getAllOrders);
adminRouter.route('/users/delete/:id').delete(authenticateToken, adminMiddleware, deleteUserById);
adminRouter.route('/users/update/:id').put(authenticateToken, adminMiddleware, getUserById);
adminRouter.route('/order/delivered/:id').put(authenticateToken, adminMiddleware, deliveredUpdate);

export default adminRouter;
