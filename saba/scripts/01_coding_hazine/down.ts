import fs from "fs"
import configWithAuth from "../../keystone"
import { getContext } from "@keystone-6/core/context";
import * as PrismaModule from '.prisma/client';
import { Context } from '.keystone/types';
import { ExcludesFalse } from "../../data/utils";

(async () => {

    const keystoneContext: Context =
        (globalThis as any).keystoneContext || getContext(configWithAuth, PrismaModule);

    const file = (await fs.readFileSync("./data.csv").toString())
        .split(/\r?\n/)
        .map(i => {
            const x = i.split(',')
            return {
                code: x.at(0)!,
                name: x.at(1)!
            }
        }).filter(i => (i.code && i.name))

    file.sort((a, b) => (a?.code?.length || 0) - (b?.code?.length || 0))

    console.log(file)
    const $tx = keystoneContext.prisma



    await $tx.category.deleteMany({
        where: {
            code: {
                in: [...file.map(i => '8/' + i.code), '8']
            }
        }
    })



})()