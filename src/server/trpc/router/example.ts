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
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getUsers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  addBook: publicProcedure
  .input(z.object({ input: z.string().nullish() }).nullish())
  .query(({ ctx, input }) => {
    console.log(input ?? "no input")
    return ctx.prisma.book.create({
      data: {
        title: "Crucial Conversations",
        author: "Waylon Jennings",
        userId: 'clblolfrd00009f00va83vney',
        pages: "223",
      },
    }); }),  
     
});
