import dotenv from "dotenv";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import authRoutes from "./routes/auth";
import managerRoutes from "./routes/manager";
import todoRoutes from "./routes/todos";

dotenv.config();

const app = new Koa();

app.use(bodyParser());
app.use(authRoutes.routes());
app.use(todoRoutes.routes());
app.use(managerRoutes.routes());

export default app;
