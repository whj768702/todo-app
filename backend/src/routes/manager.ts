import Router from "koa-router";
import { getAllUser } from "../controllers/manager";
import authMiddleware from "../middleware/auth";

const router = new Router({ prefix: "/api" });

router.post("/manager", authMiddleware, getAllUser);

export default router;
