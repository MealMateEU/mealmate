import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { Color } from "@prisma/client";

export const mateRouter = createTRPCRouter({
  getMateByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const mate = await ctx.prisma.mate.findUnique({
        where: { userId: input.userId },
      });

      return mate;
    }),

  create: protectedProcedure
    .input(z.object({ color: z.nativeEnum(Color) }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const mate = await ctx.prisma.mate.create({
        data: {
          userId,
          level: 1,
          color: input.color,
        },
      });

      return mate;
    }),
});
