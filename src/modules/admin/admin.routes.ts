import express, { Router } from 'express';
import { adminController } from './admin.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router: Router = express.Router();
router.get("/", (req, res) => {
  res.send("Admin route working");
});

router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);

export const adminRoutes = router;