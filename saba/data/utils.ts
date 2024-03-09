import axios from "axios";

export async function SendMessageToTelegram(
  message: string,
  chatId: string | number = process.env.TELEGRAM_CHANNELID!,
  token = process.env.TELEGRAM_TOKEN
) {
  try {
    // const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=MarkdownV2&text=${message}`;
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&parse_mode=HTML&text=${message}`;
    const response = await axios.get(url);
    return [response, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
}

export namespace NumUtils {
  export function format(number: number | BigInt) {
    if (typeof number === 'number') {
      return Intl.NumberFormat('en-US').format(number);
    } else
      if (typeof number === 'bigint') {
        return Intl.NumberFormat('en-US').format(number);
      }
  }

  export function deformat(number: string) {
    return BigInt(number.replace(/,/g, ''));
  }
}
