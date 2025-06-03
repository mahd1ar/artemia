/* eslint-disable import/first */
import path, { resolve } from 'node:path'
/* eslint-disable ts/no-require-imports */
require('dotenv').config({
  override: true,
  path: resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env' : '.env.dev',
  ),
})

import type { Context } from '.keystone/types'
import type { PrismaClient } from '@prisma/client'
import type { Session } from './data/types'

import fs from 'node:fs/promises'
import { config } from '@keystone-6/core'
import { getContext } from '@keystone-6/core/context'
import bodyParser from 'body-parser'
import { CronJob } from 'cron'
import markdownit from 'markdown-it'
import { session, withAuth } from './auth'
import { Roles } from './data/types'
import { Tree } from './data/utils'
import { lists } from './schema'
import { storage } from './storage'
import * as PrismaModule from '.prisma/client'

const configWithAuth = withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: 'sqlite',
      url: 'file:./saba.db',
    },
    server: {
      cors: {
        origin: [process.env.FRONTENDURL!],
        credentials: true,
      },
      extendExpressApp(app, context) {
        // add body parser
        app.use(bodyParser.json())

        app.get('/api/v1/changelog', async (req, res) => {
          try {
            const ls = (await fs.readdir(path.resolve(process.cwd(), 'changelog')))

            try {
              ls.sort((a, b) => (new Date(b.slice(0, -3)).getTime()) - (new Date(a.slice(0, -3)).getTime()))
            }
            catch { }

            const x = await Promise.all(ls.map(async (li) => {
              return `## [ changelog ${li.replace('.md', '')} ] \n ${(await fs.readFile(path.resolve(process.cwd(), 'changelog', li))).toString()}`
            }))

            const md = markdownit()

            res.send(md.render(x.join('\n')))
          }
          catch (error) {
            console.error(error)
            res.send(`<pre>${String(error)}<pre>`)
          }
        })

        app.get('/api/v1/health', (req, res) => {
          res.send('ok')
        })

        app.get('/api/v1/category-by-root/:code', async (req, res) => {
          const code = req.params.code || '' as string

          const data = await (context.prisma as PrismaClient).category.findMany({
            where: {
              code: {
                startsWith: code,
              },
            },
            select: {
              code: true,
              title: true,
              id: true,
              parentId: true,
            },
          })

          const root = data.find(i => i.code === code)

          if (!root) {
            res.send({
              children: [],
              hasChildren: false,
              isLeaf: false,
              key: '0',
              value: { code: '0', title: 'notFound any groups' },
            })
            return
          }

          type Data = Omit<typeof data[0], 'id' | 'parentId'>

          const tree = new Tree<Data>(root.id, { code, title: root.title })

          data.sort((a, b) => +(a.code ?? 0) - +(b.code ?? 0)).forEach((i) => {
            tree.insert(i.parentId!, i.id, { code: i.code, title: i.title })
          })

          res.json(tree.getRoot())
        })

        app.get('/fixdb', async (req, res) => {
          // this is for convertig every payment to payment item
          try {
            const session: Session = (await context.withRequest(req)).session

            if (session?.data.role !== Roles.admin)
              return res.status(401).json({ ok: false, message: 'unauthorized' })
            // if query parameter "key" was note "master" return 401
            if (req.query.key !== 'master')
              return res.status(401).json({ ok: false, message: 'unauthorized' })

            // const prisma = context.prisma as PrismaClient

            res.json({ ok: 1, payload: null })
          }
          catch (err) {
            // eslint-disable-next-line no-console
            console.log((err as any).message)
            res.json({ ok: 0 })
          }
        })
      },
      maxFileSize: 1024_000_000,
      port: +process.env.PORT!,
    },
    lists,
    session,
    storage,
  }),
)

function startCronJob() {
  const job = new CronJob(
    '0 1 * * *', // cronTime
    async () => {
      const keystoneContext: Context
        = (globalThis as any).keystoneContext || getContext(configWithAuth, PrismaModule)

      // create an empty daily report
      const today = new Date()
      await keystoneContext.prisma.dailyReport.create({
        data: {
          date: today,
        },
      })

      // find statement items without statement
      // FIXME fucking fix this : all rows that are part of invoces are deleting aswell
      // const statementItemsBatchPayload = await keystoneContext.prisma.row.deleteMany({
      //   where: {
      //     statement: null,

      //   },
      // })

      // create safety report in first day of each mounth
      const isFirstDayOfMounth = Intl.DateTimeFormat('us', { calendar: 'persian', day: 'numeric' }).format(today) === '3'
      if (isFirstDayOfMounth) {
        // Removed console.log('it a new date')
        await keystoneContext.prisma.safetyReport.create({
          data: {
            date: today,
          },
          select: {
            id: true,
          },
        })

        // Removed console.log(data)
      }

      // remove all rows that are not part of any invoice or statement
      (async () => {
        const rowsBatchPayload = await keystoneContext.prisma.row.deleteMany({
          where: {
            approvalId: {
              equals: null,
            },
            invoiceId: {
              equals: null,
            },
            statementId: {
              equals: null,
            },
            contractId: {
              equals: null,
            },
          },
        })

        await keystoneContext.prisma.log.create({
          data: {
            action: 'REMOVE_UNREFERENCED_ROWS',
            message: `deleted ${rowsBatchPayload.count} rows that are not part of anything`,
            userId: null, // TODO: add user id
          },
        })
      })()
    }, // onTick
    null, // onComplete
    true, // start
    'Asia/Tehran', // timeZone
  )
  return job
}

startCronJob()

export default configWithAuth
