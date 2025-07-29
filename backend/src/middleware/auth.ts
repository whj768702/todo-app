import jwt from "jsonwebtoken";
import type { Context, Next } from "koa";

const secret = process.env.JWT_SECRET || "secret-token";

export default async function authMiddleware(ctx: Context, next: Next) {
  const authHeader = ctx.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    ctx.status = 401;
    ctx.body = {
      message: "Missing or invalid authorization header",
    };
    return;
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, secret);
    ctx.state.user = payload;
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      message: "Invalid or expired token",
    };
  }
}
