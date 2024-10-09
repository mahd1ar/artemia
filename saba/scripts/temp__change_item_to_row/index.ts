import fs from "fs"
import configWithAuth from "../../keystone"
import { getContext } from "@keystone-6/core/context";
import * as PrismaModule from '.prisma/client';
import { Context } from '.keystone/types';

(async () => {

    console.log("begin")

    const keystoneContext: Context =
        (globalThis as any).keystoneContext || getContext(configWithAuth, PrismaModule);

    const statementItems = await keystoneContext.prisma.statementItem.findMany({
        select: {
            description: true,
            percentageOfWorkDone: true,
            quantity: true,
            unit: true,
            unitPrice: true,
            statementId: true,
        }
    })

    const rows = await keystoneContext.prisma.row.createMany({
        data: statementItems.map(i => {
            return {
                description: i.description,
                percentageOfWorkDone: i.percentageOfWorkDone,
                quantity: i.quantity,
                unit: i.unit,
                unitPrice: i.unitPrice,
                statementId: i.statementId
            }
        }),
    })

    console.log(rows)







})()