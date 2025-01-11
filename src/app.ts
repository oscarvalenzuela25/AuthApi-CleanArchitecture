import { envs } from "./config/env";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });
  await server.start();
}
