import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const mateRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const mate = await ctx.prisma.mate.findUnique({
        where: { userId: input.userId },
      });

      if (!mate) throw new TRPCError({ code: "NOT_FOUND" });
      return mate;
    }),

  create: protectedProcedure
    .input(z.object({ weight: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const weightHistory = await ctx.prisma.weightHistory.create({
        data: {
          userId,
          weight: input.weight,
        },
      });

      return weightHistory;
    }),
});
