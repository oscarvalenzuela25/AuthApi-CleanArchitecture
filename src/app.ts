import { envs } from './config/env';
import { MongoDatabase } from './data/mongodb/mongoDatabase';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {
  main();
})();

async function main() {
  await MongoDatabase.connect();

  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });
  await server.start();
}
