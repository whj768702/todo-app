import { PrismaClient } from "@prisma/client";
import type { Context } from "koa";

const prisma = new PrismaClient();

export const createTodo = async (ctx: Context) => {
  const { title, content, deadline } = ctx.request.body as {
    title: string;
    content?: string;
    deadline?: Date;
  };

  const userId = ctx.state.user.userId;
  console.log("create todo with userId: ", userId);
  if (!title) {
    ctx.status = 400;
    ctx.body = { message: "Title is required" };
    return;
  }

  const todo = await prisma.todo.create({
    data: {
      title,
      content,
      userId,
      deadline,
    },
  });
  ctx.body = todo;
};

export const getTodos = async (ctx: Context) => {
  const userId = ctx.state.user.userId;

  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createAt: "desc" },
  });
  ctx.body = todos;
};

export const updateTodo = async (ctx: Context) => {
  const { id } = ctx.params;
  const { title, content, done } = ctx.request.body as {
    title?: string;
    content?: string;
    done?: boolean;
  };

  const userId = ctx.state.user.userId;

  const todo = await prisma.todo.findUnique({ where: { id } });

  if (!todo || todo.userId !== userId) {
    ctx.status = 404;
    ctx.body = { message: "Todo not found" };
    return;
  }

  const updated = await prisma.todo.update({
    where: { id },
    data: { title, content, done, createAt: new Date() },
  });

  ctx.body = updated;
};

export const deleteTodo = async (ctx: Context) => {
  const { id } = ctx.params;
  const userId = ctx.state.user.userId;

  const todo = await prisma.todo.findUnique({ where: { id } });
  if (!todo || todo.userId !== userId) {
    ctx.status = 404;
    ctx.body = { message: "Todo not found" };
    return;
  }
  await prisma.todo.delete({ where: { id } });
  ctx.status = 204;
};
