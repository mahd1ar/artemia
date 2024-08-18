import { resolve } from "path";
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
import markdownit from 'markdown-it'
import fs from "fs/promises"
import path from 'path'

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



        app.get("/api/v1/changelog", async (req, res) => {
          try {

            const ls = (await fs.readdir(path.resolve(process.cwd(), 'changelog')))

            try {
              ls.sort((a, b) => (new Date(b.slice(0, -3)).getTime()) - (new Date(a.slice(0, -3)).getTime()))
            } catch (_) {

            }

            const x = await Promise.all(ls.map(async li => {
              return `## [ changelog ${li.replace(".md", '')} ] \n ` + (await fs.readFile(path.resolve(process.cwd(), 'changelog', li))).toString()
            }))



            const md = markdownit()


            res.send(md.render(x.join("\n")))


          } catch (error) {
            console.error(error)
            res.send('<pre>' + String(error) + '<pre>')
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
    const today = new Date();
    await keystoneContext.prisma.dailyReport.create({
      data: {
        date: today,
      }
    })

    // find statement items without statement
    const statementItemsBatchPayload = await keystoneContext.prisma.statementItem.deleteMany({
      where: {
        statement: null
      },
    })

    console.info(statementItemsBatchPayload.count + ' items are deleted')

    // create safety report in first day of each mounth
    const isFirstDayOfMounth = Intl.DateTimeFormat("us", { calendar: "persian", day: "numeric" }).format(today) === '3'
    if (isFirstDayOfMounth) {
      console.log('it a new date')
      const data = await keystoneContext.prisma.safetyReport.create({
        data: {
          date: today,
        },
        select: {
          id: true
        }
      })

      console.log(data)
    }

  }, // onTick
  null, // onComplete
  true, // start
  'Asia/Tehran' // timeZone
);


export default configWithAuth