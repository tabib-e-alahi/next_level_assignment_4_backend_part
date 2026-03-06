import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { providerController } from './provider.controller';
const router: Router = express.Router();

router.post("/providerProfile", auth(UserRole.PROVIDER), providerController.createProfile);
router.post("/meals", auth(UserRole.PROVIDER), providerController.createMeals);

// POST	/api/provider/meals	      Add meal to menu
// PUT	/api/provider/meals/:id	      Update meal
// DELETE	/api/provider/meals/:id	      Remove meal
// PATCH	/api/provider/orders/:id	Update order status

export const providerRoutes = router;