import { PrismaClient } from "@prisma/client";
import type { Context } from "koa";

const prisma = new PrismaClient();

export const getAllUser = async (ctx: Context) => {
  const users = await prisma.user.findMany();
  ctx.body = users;
};
