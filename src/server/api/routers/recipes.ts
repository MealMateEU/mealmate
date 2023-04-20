import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getExternalRecipes } from "../external/recipes.external";

export const recipesRouter = createTRPCRouter({
  getSuggested: protectedProcedure.query(async ({ ctx }) => {
    return await getExternalRecipes({
      type: "public",
      excluded: ["chicken"],
    });
  }),
});
