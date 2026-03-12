import express, { Application } from "express";
import cors from 'cors'
import { authRoutes } from "./modules/auth/auth.routes";
import errorHandler from "./middlewares/globalErrorHandler";
import { providerRoutes } from "./modules/provider/provider.routes";
import { mealsRoutes } from './modules/meals/meals.routes';
import { adminRoutes } from "./modules/admin/admin.routes";
import { cartRoutes } from "./modules/cart/cart.routes";
import { orderRoutes } from "./modules/order/order.routes";
import { reviewsRoutes } from "./modules/reviews/reviews.routes";

const app: Application = express();

app.use(cors({
      origin: process.env.FRONTEND_URL || "http://localhost:3000", // client side url
      credentials: true
}))

app.use(express.json());

app.use("/api/auth", authRoutes)

app.use("/api/provider", providerRoutes)
app.use("/api", mealsRoutes)

app.use("api/v1/admin", adminRoutes)

app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/reviews", reviewsRoutes)


app.get("/", (req, res) => {
      res.send("Hello, World!");
});

// app.use(notFound)
app.use(errorHandler)

export default app;