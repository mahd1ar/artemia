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
                code: '8/' + x.at(0)!,
                name: x.at(1)!
            }
        }).filter(i => (i.code && i.name))

    file.sort((a, b) => (a?.code?.length || 0) - (b?.code?.length || 0))

    console.log(file)
    const $tx = keystoneContext.prisma


    const root = await $tx.category.create({
        data: {
            isProtected: true,
            title: 'OMG',
            code: '8'
        }
    })

    const createPromises = file.map(i => {
        return $tx.category.create({
            data: {
                title: i.name,
                code: i.code,
            },
            select: { id: true, code: true }
        })
    })

    const all = (await Promise.all(createPromises))

    console.log(all)


    all.forEach(async i => {

        if (i.code) {
            const splitedCode = i.code?.split('/').filter(Boolean)
            if (splitedCode?.length > 2) {

                const parent = all.find(ii => {

                    return ii.code === splitedCode.slice(0, 2).join("/")
                }) || null

                // console.log(parent?.id + ' for ' + i.code)


                await $tx.category.update({
                    where: {
                        id: i.id
                    },
                    data: {
                        parentId: parent?.id || null
                    }
                })


            } else {

                await $tx.category.updateMany({
                    where: {
                        code: {
                            equals: i.code
                        }
                    },
                    data: {
                        parentId: root.id
                    }
                })


            }
        }

    })







})()