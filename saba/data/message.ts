import axios from 'axios'

async function sendMessage(message: string): Promise<boolean> {
  const TELEGRAM_TOKEN = '6462737055:AAEbsQMwvFowX-mRzLTVVArwf1hlCppnNLs'
  const TELEGRAM_CHAT_ID = process.env.NODE_ENV !== 'production' ? '-1002206133203' : '-1002235700788'
  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`

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

export class Notif {
  static async workShopIsDoneUploadingStatement(statementTitle: string, user: string, statementUrl: string) {
    const message = `
( ربات کنترل پروژه صبا )

📝 صورت وضعبت  "${statementTitle}" در سامانه کنترل پروژه صبا توسط (${user}) آپلود شد

امکان تایید این مصوبه توسط گروه "کنترل پروژه" امکان پذیر هست

${statementUrl}           
`

    return await sendMessage(message)
  }

  static async statementIsConfirmedByProjectManager(statementTitle: string, user: string, statementUrl: string) {
    const message = `
( ربات کنترل پروژه صبا )

👷‍♂️ صورت وضعبت  "${statementTitle}" در سامانه کنترل پروژه صبا توسط (${user})  تایید شد

امکان تایید این مصوبه توسط گروه "مالی" امکان پذیر هست

${statementUrl}           
`

    return await sendMessage(message)
  }

  static async statementIsConfirmedByFinancialSupervisor(statementTitle: string, user: string, statementUrl: string) {
    const message = `
( ربات کنترل پروژه صبا )

💵 صورت وضعبت  "${statementTitle}" در سامانه کنترل پروژه صبا توسط (${user})  تایید شد

امکان تایید و پرداخت این مصوبه توسط  "مسؤل فنی" امکان پذیر هست

${statementUrl}           
`

    return await sendMessage(message)
  }

  static async sendGeneralMessage(message: string) {
    return await sendMessage(message)
  }

  static async sendStatementAttachmenets(
    title: string,
    attachmentsUrl: string[] | null,
    peymentsUrl: string[] | null,
  ) {
    const hasImageOrAttachments = !!(attachmentsUrl && attachmentsUrl?.length > 0)
    const hasPayments = !!peymentsUrl && peymentsUrl?.length > 0

    if (attachmentsUrl)
      attachmentsUrl = attachmentsUrl?.map((i, index) => `${index + 1}- ${i}`)

    if (peymentsUrl)
      peymentsUrl = peymentsUrl?.map((i, index) => `${index + 1}- ${i}`)

    const msg = `(ربات کنترل پروژه صبا: نسخه ی آزمایشی)

🗂 "${title}"

🔗 فایل های ضمیمه شده:
${!hasImageOrAttachments
    ? 'هیچ فایلی ضمیمه نشده'
    : attachmentsUrl!.join('\n')
}

${hasPayments ? `🔗 رسید های پرداختی: \n${peymentsUrl!.join('\n')}` : ''}
`

    return await sendMessage(msg)
  }

  static async newInvoiceCreated(args: { title: string, uploader: string, attachmentsUrl: string[], invoiceUrl: string }) {
    const msg = `( ربات کنترل پروژه صبا )
        
📜 فاکتور جدید با عنوان "${args.title}" در سامانه کنترل پروژه صبا ایجاد 

🔗 فایل های ضمیمه شده:

${args.attachmentsUrl.map((i, index) => `${index + 1}- ${i}`).join('\n\n') || ' ** هیچ فایلی ضمیمه نشده **'}

🙋‍♂️ بارگذاری این فاکتور توسط: ${args.uploader}

🛟  ${args.invoiceUrl}
`

    await sendMessage(msg)
  }

  static async newContractCreated(args: { title: string, url: string }) {
    const msg = `( ربات کنترل پروژه صبا )
        
📜 قرارداد جدیدی با عنوان "${args.title}" در سامانه کنترل پروژه صبا ایجاد 

🕒 این قرارداد منتظر تایید مدیریت میباشد

🛟  ${args.url}
`

    await sendMessage(msg)
  }
}
