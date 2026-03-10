import express, { Router } from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { providerController } from './provider.controller';
const router: Router = express.Router();

//! -------------------- Provider Profiles Routes ------------------
//get all providers
router.get("/", providerController.getAllProviders);

// get a provider profile with menu
router.get("/:id", providerController.getProviderByIdPublic)

// create provider profile
router.post("/providerProfile", auth(UserRole.PROVIDER), providerController.createProfile);

//! -------------------- Provider Meals Routes ------------------
// add meals to the db
router.post("/meals", auth(UserRole.PROVIDER), providerController.createMeals);
// edit meals data
router.put("/meals/:id", auth(UserRole.PROVIDER), providerController.updateMeals);

// //TODO: Need to comple
// router.patch("/meals/:id", auth(UserRole.PROVIDER), providerController.createMeals);

//TODO: Need to comple
router.delete("/meals/:id", auth(UserRole.PROVIDER), providerController.deleteMeals);

// POST	/api/provider/meals	      Add meal to menu
// PUT	/api/provider/meals/:id	      Update meal
// DELETE	/api/provider/meals/:id	      Remove meal
// PATCH	/api/provider/orders/:id	Update order status

export const providerRoutes = router;