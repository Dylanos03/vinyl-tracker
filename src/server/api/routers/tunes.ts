import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tunesRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        tuneName: z.string().min(1),
        tuneArtist: z.string().min(1),
        genre: z.string().min(1),
        bpm: z.number().min(2),
        tuneKey: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tune.create({
        data: {
          tuneName: input.tuneName,
          tuneArtist: input.tuneArtist,
          genre: input.genre,
          bpm: input.bpm,
          tuneKey: input.tuneKey,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.tune.findMany();
  }),

  getSome: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.tune.findMany({
      where: { tuneName: { contains: input, mode: "insensitive" } },
    });
  }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tune.delete({ where: { id: input.id } });
    }),
});
