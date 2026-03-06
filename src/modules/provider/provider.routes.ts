import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { providerController } from './provider.controller';
const router: Router = express.Router();

router.post("/createProfile", auth(UserRole.PROVIDER), providerController.createProfile)
export const providerRoutes = router;