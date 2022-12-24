import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const serverRouter = router({
    createServer: protectedProcedure
    .input(z.object({ 
      name: z.string(),
      description: z.string().nullish(),
      adminUserId: z.string(),
      private: z.boolean(),
      startDate: z.date().nullish(),
      endDate: z.date().nullish(),
      passcode: z.string().nullable()
    }))
    .mutation(({ctx, input}) => {
        return ctx.prisma.server.create({
          data: {
            adminUserId: input.adminUserId,
            description: input.description,
            name: input.name,
            private: input.private,
            startDate: input.startDate,
            endDate: input.endDate,
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
