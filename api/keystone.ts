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
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

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
      url: "file:./keystone.db",
    },
    server: {
      cors: {
        origin: [process.env.FRONTENDURL!],
        credentials: true,
      },
      extendExpressApp(app, context) {
        app.get<{}, Response>("/test", async (req, res) => {
          res.json({
            message: "hello world",
            ok: false,
          });
        });
        // add body parser
        app.use(bodyParser.json());
        app.post<{}, Response>("/placeorder", async (req, res) => {
          const {
            address,
            code,
            tel,
            city,
            postalCode,
            orderContent,
            id,
            fullname,
          } = req.body;
          // let id = req.body.id;

          const prisma = new PrismaClient();

          try {
            if (!id) {
              const customer = await prisma.customer.create({
                data: {
                  name: fullname,
                  address,
                  city,
                  code,
                  tel,
                  postalCode,
                  orders: {
                    create: {
                      orderContent,
                    },
                  },
                },
              });

              res.cookie("id", customer.id, {
                maxAge: 900000,
              });

              res.json({
                message: "successuly placed order",
                payload: {
                  id: customer.id,
                },
              });
            } else {
              const order = await prisma.order.create({
                data: {
                  orderContent: orderContent,
                  customer: {
                    connect: {
                      id: id,
                    },
                  },
                },
              });

              res.json({
                message: "successuly placed order",
                payload: {
                  id: order.id,
                },
              });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({
              message: "error",
              payload: error,
            });
          } finally {
            await prisma.$disconnect();
          }
        });
        app.get<{}, Response>("/getcustomer", async (req, res) => {
          const customerid = req.query.customerid
            ? Array.isArray(req.query.customerid)
              ? req.query.customerid[0]
              : req.query.customerid
            : null;

          if (!customerid) {
            res
              .status(400)
              .json({ message: "customer id is required", payload: {} });
            return;
          }

          const prisma = new PrismaClient();

          const customer = await prisma.customer.findUnique({
            where: {
              id:
                typeof customerid === "string"
                  ? customerid
                  : String(customerid),
            },
          });

          if (!customer) {
            res
              .status(404)
              .json({ message: "customer not found", payload: {} });

            return;
          }

          const fullname = customer?.name || "";
          const tel = customer?.tel || "";
          const address = customer?.address || "";
          const city = customer?.city || "";
          const postalCode = customer?.postalCode || "";
          const code = customer?.code || "";

          res.json({
            message: "",
            payload: {
              fullname,
              tel,
              address,
              city,
              postalCode,
              code,
            },
          });

          prisma.$disconnect();
        });
      },
      maxFileSize: 1024_000_000,
      port: 3032,
    },
    lists,
    session,
    storage,
  })
);
