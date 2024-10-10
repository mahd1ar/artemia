import { Context } from '.keystone/types';
import * as PrismaModule from '.prisma/client';
import { getContext } from "@keystone-6/core/context";
import { gql } from "@ts-gql/tag/no-transform";
import configWithAuth from "../../keystone";
import fs from "node:fs/promises"

(async () => {

    console.log("begin")

    const keystoneContext: Context =
        (globalThis as any).keystoneContext || getContext(configWithAuth, PrismaModule);

    const sudo = keystoneContext.sudo()

    const STATEMENTIMAGS = gql`
        query STATEMENTIMAGS {
            statements {
                id
                image {
                    id
                    url
                    extension
                    filesize
                }
                createdAt
            }
        }
        ` as import("../../__generated__/ts-gql/STATEMENTIMAGS").type

    const data = await sudo.graphql.run({
        query: STATEMENTIMAGS
    })

    console.log('count:' + data.statements?.length)

    const images = data.statements?.map(i => ({
        statementid: i.id,
        extension: i.image?.extension,
        size: i.image?.filesize,
        filename: i.image?.url.split('/').pop(),
        createdAt: i.createdAt
    }))

    const prisma = keystoneContext.prisma

    const x = await prisma.fileStore.createMany({
        data: images!.map(i => {
            return {
                createdAt: i.createdAt,
                file_filename: i.filename,
                file_filesize: i.size,
                createdById: 'clvdw2dc4002u43yc4smzda77',
                statementId: i.statementid,
                type: 'image',
            }
        })
    })

    console.log(x)
    // .forEach(async i => {
    //     // check if file exists

    //     const srcFile = `./../../public/files/${i.path}`;
    //     const dstFile = `./../../public/files/${i.path}`

    //     if (await !fs.access(srcFile)) {
    //         console.error(`file ${srcFile} does not exist`)    
    //         process.exit(0)
    //     }
    //     // move image from image folder to files folder


    //     console.log(i)
    // })
    // await fs.rename(srcFile, dstFile)



})()