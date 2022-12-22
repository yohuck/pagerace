import { contextProps } from "@trpc/react-query/dist/internals/context";
import { now } from "next-auth/client/_utils";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getUserBooks: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.book.findMany({
        where: {
          userId: input
        }
    });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  addBook: publicProcedure
  .input(z.object({ input: z.string().nullish() }).nullish())
  .mutation(({ ctx, input }) => {
    console.log(input ?? "no input")
    return ctx.prisma.book.create({
      data: {
        title: "Crucial Conversations",
        author: "Waylon Jennings",
        userId: 'clblolfrd00009f00va83vney',
        pages: "223",
      },
    }); }), 
    deleteBook: publicProcedure
    .input(z.string()) 
    .mutation(({ctx, input}) => {
      return ctx.prisma.book.delete({
        where: {
          id: input
        }
      })
    }),
    finishBook: publicProcedure
    .input(z.string())
    .mutation(({ctx, input}) => {
      return ctx.prisma.book.update({
        where: {
          id: input
        },
        data: {
          read: true,
          finishedAt: new Date(Date.now())
        }
      })
    }),
    startBook: publicProcedure
    .input(z.string())
    .mutation(({ctx, input}) => {
      return ctx.prisma.book.update({
        where: {
          id: input
        }, 
        data: {
          startedAt: new Date(Date.now())
        }
      })
    })
});
