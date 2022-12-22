import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { serverRouter } from "./servers";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  servers: serverRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
