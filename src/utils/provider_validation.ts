import { UserRole } from "../middlewares/auth";

export const isProviderAndActive = (user: any) => {
    if (!user) {
        return { ok: false, code: 401, message: "Unauthorized access." };
    }

    if (user.role !== UserRole.PROVIDER) {
        return { ok: false, code: 403, message: "Forbidden! Only providers can access this resource." };
    }

    if (user.status !== "ACTIVE") {
        return { ok: false, code: 403, message: "Your account is not active." };
    }

    return { ok: true };
};