import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const serverRouter = router({
    createServer: protectedProcedure
    .input(z.object({ 
      name: z.string(),
      description: z.string().nullish(),
      adminUserId: z.string(),
      private: z.boolean(),
      startDate: z.date(),
      endDate: z.date(),
      passcode: z.string().nullable()
    }))
    .mutation(({ctx, input}) => {

     const dater = (input: Date) => {
      const date = new Date(input);
      date.setHours(date.getHours() + 14);
      const pad = (n: number): string => n.toString().padStart(2, "0");
      const result = date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "T" + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds()) + '.000Z' ;
      return result
    } 

     const start = dater(input.startDate)
     const end = dater(input.endDate)


        return ctx.prisma.server.create({
          data: {
            adminUserId: input.adminUserId,
            description: input.description,
            name: input.name,
            private: input.private,
            startDate: start,
            endDate: end,
            passcode: input.passcode,
          }
        });
    }),
    joinServer: publicProcedure
    .input(z.object({
      serverId: z.string(),
      passcode: z.string().nullable(),
      userId: z.string()
    }))
    .mutation(({ctx, input}) => {
      return ctx.prisma.membersInServers.create({
        data: {
          serverId: input.serverId,
          memberUserId: input.userId
        }
      });
    }),
  getAdminServers: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.server.findMany({
        where: {
          adminUserId: input
        }
    });
    }),
  getAllServers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.server.findMany();
  }),
  getUserServers: publicProcedure
  .input(z.string())
  .query(({ ctx, input }) => {
    return ctx.prisma.server.findMany({
        where: {
            relations: {
                some: {
                    memberUserId: input
                }
            }
            }

        })
    }),
    getSingleServer: publicProcedure
    .input(z.string())
    .query(({ctx, input}) => {
      return ctx.prisma.server.findFirst({
        where: {
          id: input
        },
      })
    }),
    getServerUsers: publicProcedure
    .input(z.string())
    .query(({ctx, input}) => {
      return ctx.prisma.user.findMany({
        where: {
          relation: {
            some: {
              serverId: input
            }
          }
        },
        include: {
          books: true
        }
      })
    }),
    getServerUserBooks: publicProcedure
    .input(z.object({userId: z.string(), startDate: z.date(), endDate: z.date()}))
    .query(({ctx, input}) => {
      return ctx.prisma.book.findMany({
        where: {
          userId: input.userId,
          startedAt: {
            gte: input.startDate,
            lte: input.endDate,
          }
        }
      })
    }),
    aggServerUserBooks: publicProcedure
    .input(z.string())
    .query(({ctx, input}) => {
      return ctx.prisma.book.aggregate({
        _sum: {
          pages: true
        },
        where: {
          userId: input,
          startedAt: {
            gte: new Date(1-1-2020),
            lte: new Date()
          }
        }
      })
    }),
    checkServerPassword: publicProcedure
    .input(z.string())
    .query(({ctx, input}) => {
      return ctx.prisma.server.findFirst({
        where: {
          passcode: input
        }
      })
    })
});
