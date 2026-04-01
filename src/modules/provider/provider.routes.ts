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


router.get("/menu/meals", auth(UserRole.PROVIDER), providerController.getProviderAllMeals);
router.get("/menu/meals/:id", auth(UserRole.PROVIDER), providerController.getProviderSingleMeal);

router.post("/menu/meals", auth(UserRole.PROVIDER), providerController.createMeals);
// edit meals data
router.put("/menu/meals/:id", auth(UserRole.PROVIDER), providerController.updateMeals);


// router.patch("/meals/:id", auth(UserRole.PROVIDER), providerController.createMeals);

router.delete("/menu/meals/:id", auth(UserRole.PROVIDER), providerController.deleteMeals);

//! ------------- Provider Order routes ----------------- 
router.get("/provider-orders/orders", auth(UserRole.PROVIDER), providerController.viewIncomingOrders);

router.patch("/provider-orders/orders/:id", auth(UserRole.PROVIDER), providerController.updateOrderStatus);

export const providerRoutes = router;