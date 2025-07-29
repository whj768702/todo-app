import { PrismaClient } from "@prisma/client";
import type { Context } from "koa";
import { comparePassword, hashPassword } from "../utils/hash";
import { signToken } from "../utils/jwt";

const prisma = new PrismaClient();

export const register = async (ctx: Context) => {
  const { email, password } = ctx.request.body as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    ctx.status = 400;
    ctx.body = {
      message: "Email and password are required",
    };
    return;
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    ctx.status = 409;
    ctx.body = {
      message: "Email already registered",
    };
    return;
  }

  const hasded = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email,
      password: hasded,
    },
  });
  ctx.body = {
    id: user.id,
    email: user.email,
  };
};

export const login = async (ctx: Context) => {
  const { email, password } = ctx.request.body as {
    email: string;
    password: string;
  };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await comparePassword(password, user.password))) {
    ctx.status = 401;
    ctx.body = {
      message: "Invalid credentials",
    };
    return;
  }

  const token = signToken({ userId: user.id });

  ctx.body = {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
};

export const getProfile = async (ctx: Context) => {
  const user = ctx.state.user;
  ctx.body = { user };
};
