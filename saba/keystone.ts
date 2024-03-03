import { resolve } from "path";
import axios from "axios";
require("dotenv").config({
  override: true,
  path: resolve(
    process.cwd(),
    process.env.NODE_ENV === "production" ? ".env" : `.dev.env`
  ),
});
import { storage } from "./storage";
import { config } from "@keystone-6/core";
import { lists } from "./schema";

import { withAuth, session } from "./auth";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import { SendMessageToTelegram } from "./data/utils";

type Response = {
  message: string;
  ok?: boolean;
  payload?: any;
};

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./saba.db",
    },
    server: {
      cors: {
        origin: [process.env.FRONTENDURL!],
        credentials: true,
      },
      extendExpressApp(app, context) {
       
        // add body parser
        app.use(bodyParser.json());

      },
      maxFileSize: 1024_000_000,
      port: +process.env.PORT!,
    },
    lists,
    session,
    storage,
  })
);
