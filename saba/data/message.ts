import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'
import TelegramBot from 'node-telegram-bot-api'

const TELEGRAM_TOKEN = '6462737055:AAEbsQMwvFowX-mRzLTVVArwf1hlCppnNLs'
const TELEGRAM_CHAT_ID
  = process.env.NODE_ENV !== 'production' ? '-1002667512684' /* old group is '-1002206133203' */: '-1002235700788'

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false })

async function sendMessage(message: string): Promise<boolean> {
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(
    message,
  )}&parse_mode=markdown`

  try {
    await axios.get(url)
    return true
  }
  catch (error) {
    console.error('error sending message:')
    console.error(error)
    return false
  }
}

async function createReadStreamFromUrl(url: string) {
  const filename = url.split('/').filter(Boolean).pop()

  if (!filename)
    throw new Error('filename not found')

  if (fs.existsSync(path.join(process.cwd(), 'public/files', filename))) {
    return fs.createReadStream(
      path.join(process.cwd(), 'public/files', filename),
    )
  }
  else if (
    fs.existsSync(path.join(process.cwd(), 'public/images', filename))
  ) {
    return fs.createReadStream(
      path.join(process.cwd(), 'public/images', filename),
    )
  }
  else {
    throw new Error('file not found')
  }
}

export class Notif {
  static async workShopIsDoneUploadingStatement(
    statementTitle: string,
    user: string,
    statementUrl: string,
  ) {
    const message = `
( ربات کنترل پروژه صبا )

📝 صورت وضعبت  "${statementTitle}" در سامانه کنترل پروژه صبا توسط (${user}) آپلود شد

امکان تایید این مصوبه توسط گروه "کنترل پروژه" امکان پذیر هست

${statementUrl}           
`

    return await sendMessage(message)
  }

  static async statementIsConfirmedByProjectManager(
    statementTitle: string,
    user: string,
    statementUrl: string,
  ) {
    const message = `
( ربات کنترل پروژه صبا )

👷‍♂️ صورت وضعبت  "${statementTitle}" در سامانه کنترل پروژه صبا توسط (${user})  تایید شد

امکان تایید این مصوبه توسط گروه "مالی" امکان پذیر هست

${statementUrl}           
`

    return await sendMessage(message)
  }

  static async statementIsConfirmedByFinancialSupervisor(
    statementTitle: string,
    user: string,
    statementUrl: string,
  ) {
    const message = `
( ربات کنترل پروژه صبا )

💵 صورت وضعبت  "${statementTitle}" در سامانه کنترل پروژه صبا توسط (${user})  تایید شد

امکان تایید و پرداخت این مصوبه توسط  "مسؤل فنی" امکان پذیر هست

[برای مشاهده کلیک کنید](${statementUrl})        
`

    return await sendMessage(message)
  }

  static async sendGeneralMessage(message: string) {
    return await sendMessage(message)
  }

  static async sendStatementAttachmenets(
    title: string,
    attachmentsUrl: { label: string, url: string }[] | null,
    peymentsUrl: { label: string, url: string }[] | null,
  ) {
    if (attachmentsUrl === null)
      attachmentsUrl = []
    if (peymentsUrl === null)
      peymentsUrl = []

    title = ` صورت وضعیت ${title}`

    const msg = `( ربات کنترل پروژه صبا )

🗂 "${title}"
`

    // 🔗 فایل های ضمیمه شده:
    // ${!hasImageOrAttachments
    //     ? 'هیچ فایلی ضمیمه نشده'
    //     : attachmentsUrl2
    // }

    // ${hasPayments ? `🔗 رسید های پرداختی: \n${peymentsUrl2}` : ''}

    try {
      const message = await bot.sendMessage(TELEGRAM_CHAT_ID, msg, {
        parse_mode: 'Markdown',
      })
      const allFiles = attachmentsUrl?.concat(peymentsUrl!)

      for (let j = 0; j < allFiles.length; j++) {
        const i = allFiles[j]
        if (i.url.trim() === '')
          continue
        const rs = await createReadStreamFromUrl(i.url)
        const extension = i.url.split('.').pop() || ''
        if (['jpg', 'jpeg', 'png'].includes(extension)) {
          await bot.sendPhoto(TELEGRAM_CHAT_ID, rs, {
            caption: i.label,
            reply_to_message_id: message.message_id,
          })
        }
        else {
          await bot.sendDocument(TELEGRAM_CHAT_ID, rs, {
            caption: i.label,
            reply_to_message_id: message.message_id,
          })
        }
      }
      return true
    }
    catch (err) {
      console.error('[]ERRX1')
      console.error(err)
      return false
    }
  }

  static async newInvoiceCreated(args: {
    title: string
    uploader: string
    attachmentsUrl: { label: string, url: string }[]
    invoiceUrl: string
  }) {
    const msg = `( ربات کنترل پروژه صبا )
        
📜 فاکتور جدید با عنوان "${args.title}" در سامانه کنترل پروژه صبا ایجاد 

🙋‍♂️ بارگذاری این فاکتور توسط: ${args.uploader}

🛟  [برای مشاهده کلیک کنید](${args.invoiceUrl})
`

    // 🔗 فایل های ضمیمه شده:

    // ${ args.attachmentsUrl.map((i, index) => `${index + 1}- ${i.url}`).join('\n\n') || ' ** هیچ فایلی ضمیمه نشده **' }

    try {
      const message = await bot.sendMessage(TELEGRAM_CHAT_ID, msg, {
        parse_mode: 'Markdown',
      })

      for (let j = 0; j < args.attachmentsUrl.length; j++) {
        const i = args.attachmentsUrl[j]

        const rs = await createReadStreamFromUrl(i.url)
        const extension = i.url.split('.').pop() || ''

        if (['jpg', 'jpeg', 'png'].includes(extension)) {
          bot
            .sendPhoto(TELEGRAM_CHAT_ID, rs, {
              caption: i.label,
              reply_to_message_id: message.message_id,
            })
            .then(() => 0)
            .catch((err) => {
              console.error(err)
              console.error('ERRX12')
            })
        }
        else {
          bot
            .sendDocument(TELEGRAM_CHAT_ID, rs, {
              caption: i.label,
              reply_to_message_id: message.message_id,
            })
            .then(() => 0)
            .catch((err) => {
              console.error(err)
              console.error('ERRX13')
            })
        }
      }
      return true
    }
    catch (error) {
      console.error(error)
      return false
    }
  }

  static async newContractCreated(args: { title: string, url: string }) {
    const msg = `( ربات کنترل پروژه صبا )
        
📜 قرارداد جدیدی با عنوان "${args.title}" در سامانه کنترل پروژه صبا ایجاد 

🕒 این قرارداد منتظر تایید مدیریت میباشد

🛟  ${args.url}
`

    await sendMessage(msg)
  }

  static async contractIsApproved(args: { title: string, url: string }) {
    const msg = `( ربات کنترل پروژه صبا )
        
✅ قرارداد  "${args.title}" در سامانه کنترل پروژه صبا تایید شد 

🛟 [برای مشاهده کلیک کنید](${args.url})
`

    await sendMessage(msg)
  }
}
