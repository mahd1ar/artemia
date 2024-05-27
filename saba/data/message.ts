import axios from "axios";

async function sendMessage(message: string): Promise<boolean> {

    const TELEGRAM_TOKEN = "6462737055:AAEbsQMwvFowX-mRzLTVVArwf1hlCppnNLs"
    const TELEGRAM_CHAT_ID = process.env.NODE_ENV !== 'production' ? "-1002206133203" : "-1002206133203"
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`;

    try {

        const { data } = await axios.get(url)
        console.log("success")
        console.log(data.result)
        return true

    } catch (error) {
        console.log("error")
        console.error(error)
        return false
    }

}


export namespace Notif {


    export async function workShopIsDoneUploadingStatement(statementTitle: string, user: string, statementUrl: string) {

        const message = `
(ربات کنترل پروژه صبا: نسخه ی آزمایشی)

📝 صورت وضعبت  "${statementTitle}" در سامانه کنترل پروژه صبا توسط (${user}) آپلود شد

امکان تایید این مصوبه توسط گروه "کنترل پروژه" امکان پذیر هست

${statementUrl}           
`

        return await sendMessage(message)
    }

    export async function statementIsConfirmedByProjectManager(statementTitle: string, user: string, statementUrl: string) {

        const message = `
(ربات کنترل پروژه صبا: نسخه ی آزمایشی)

👷‍♂️ صورت وضعبت  "${statementTitle}" در سامانه کنترل پروژه صبا توسط (${user})  تایید شد

امکان تایید این مصوبه توسط گروه "مالی" امکان پذیر هست

${statementUrl}           
`

        return await sendMessage(message)
    }

    export async function statementIsConfirmedByFinancialSupervisor(statementTitle: string, user: string, statementUrl: string) {

        const message = `
(ربات کنترل پروژه صبا: نسخه ی آزمایشی)

💵 صورت وضعبت  "${statementTitle}" در سامانه کنترل پروژه صبا توسط (${user})  تایید شد

امکان تایید و پرداخت این مصوبه توسط  "ناظر کل" امکان پذیر هست

${statementUrl}           
`

        return await sendMessage(message)
    }


}