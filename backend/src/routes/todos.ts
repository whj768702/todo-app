import Router from "koa-router";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todos";
import authMiddleware from "../middleware/auth";

const router = new Router({ prefix: "/api/todos" });

router.use(authMiddleware);

router.get("/", getTodos);
router.post("/", createTodo);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
