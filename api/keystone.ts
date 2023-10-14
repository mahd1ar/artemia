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
            orderType,
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
                      orderType: orderType ? JSON.stringify(orderType) : "",
                    },
                  },
                },
                include: {
                  orders: true,
                },
              });

              const notifyMessage = `🔔 <b>new order</b> from: ${customer.name}

📦 order message:  <b>${customer.orders[0].orderContent}</b>
✨ order type: <b>${
                customer.orders[0].orderType
                  ? JSON.parse(customer.orders[0].orderType).join(", ")
                  : "undefind"
              }</b>

📞 phone number: <b>${customer.tel || "undefined"}</b>

🔭 <a href="https://admin.iranartemia.com/order/${
                customer.orders[0].id
              }"> click to view in website</a>

🐟🐠🐟🐠🐟
              `;

              SendMessageToTelegram(encodeURIComponent(notifyMessage));

              res.json({
                message: "successuly placed order",
                payload: {
                  customerid: customer.id,
                  orderid: customer.orders[0].id,
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
                  orderid: order.id,
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

        app.get<{}, Response>("/set-admin", async (req, res) => {
          const prisma = new PrismaClient();

          const adminUser = await prisma.user.findUnique({
            where: {
              email: "mahd1ar@protonmail.com",
            },
          });

          if (adminUser) {
            await prisma.user.update({
              where: {
                email: adminUser.email,
              },
              data: {
                role: "admin",
              },
            });

            res.json({
              message: "successuly update admin role",
              ok: true,
              payload: {
                user: adminUser,
              },
            });
          } else {
            const user = await prisma.user.create({
              data: {
                name: "admin",
                email: "mahd1ar@protonmail.com",
                role: "admin",
                password: "Aa123456",
              },
            });

            res.json({
              message: "successuly set admin role",
              ok: true,
              payload: {
                user,
              },
            });
          }

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
