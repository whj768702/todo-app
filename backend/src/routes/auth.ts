import Router from "koa-router";
import { getProfile, login, register } from "../controllers/auth";
import authMiddleware from "../middleware/auth";

const router = new Router({ prefix: "/api" });

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getProfile);

export default router;
