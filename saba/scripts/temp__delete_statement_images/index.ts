import { Context } from '.keystone/types';
import * as PrismaModule from '.prisma/client';
import { getContext } from "@keystone-6/core/context";
import { gql } from "@ts-gql/tag/no-transform";
import configWithAuth from "../../keystone";
import fs from "fs"

(async () => {

    console.log("begin")

    const keystoneContext: Context =
        (globalThis as any).keystoneContext || getContext(configWithAuth, PrismaModule);

    const sudo = keystoneContext.sudo()

    const STATEMENTIMAGS = gql`
        query STATEMENTIMAGS {
            statements {
                id
                attachments {
                    file {
                        url
                    }
                }
            }
        }
        ` as import("../../__generated__/ts-gql/STATEMENTIMAGS").type

    const data = await sudo.graphql.run({
        query: STATEMENTIMAGS
    })



    const images = data.statements?.map(i => (i.attachments?.map(ii => `./../../public/images/${ii.file?.url.split('/').pop()}` ))).flat()!

    console.log('count is', images.length)
    images?.forEach(async i => {
        if(i){

            if(fs.existsSync(i))
                fs.rmSync(i)
                
        }
        else {
            console.log('i is undefined')
        }
    })
 
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