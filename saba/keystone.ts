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
import bodyParser from "body-parser";
import { Session } from "./data/types";
import { PrismaClient } from "@prisma/client";
import { CronJob } from "cron";
import { getContext } from '@keystone-6/core/context';
import { Context } from '.keystone/types';
import * as PrismaModule from '.prisma/client';

type Response = {
  message: string;
  ok?: boolean;
  payload?: any;
};



const configWithAuth = withAuth(
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

        app.post("/api/v1/log", async (req, res) => {
          try {


            const sid = req.body.sid
            const action = req.body.action
            const session = (await context.withRequest(req)).session as Session
            const prisma = context.prisma as PrismaClient
            if (!session) {
              res.json({ ok: false })
              return
            }

            if (action === 'STATEMENT_CONFIRMED') {
              await prisma.log.create({
                data: {
                  action: action,
                  type: 'info',
                  message: `تایید صورت وضعیت ${sid} از طرف ${session.data?.name} با موفقیت انجام شد`,
                }
              })
            }

            res.json({ ok: true })

          } catch (error) {
            console.log(error)
            res.json({ ok: false, message: String(error) })
          }
        })

      },
      maxFileSize: 1024_000_000,
      port: +process.env.PORT!,
    },
    lists,
    session,
    storage,
  })
);

new CronJob(
  '0 1 * * *', // cronTime
  async function () {
    const keystoneContext: Context =
      (globalThis as any).keystoneContext || getContext(configWithAuth, PrismaModule);

    // create an empty daily report
    await keystoneContext.prisma.dailyReport.create({
      data: {
        date: new Date(),
      }
    })

  }, // onTick
  null, // onComplete
  true, // start
  'Asia/Tehran' // timeZone
);

export default configWithAuth