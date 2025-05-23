/**
 *
 * @type {string}
 */
const delimiter = ' و '

/**
 *
 * @type {string}
 */
const zero = 'صفر'

/**
 *
 * @type {string}
 */
const negative = 'منفی '

/**
 *
 * @type {*[]}
 */
const letters = [
  ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
  ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده', 'بیست'],
  ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
  ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'],
  ['', ' هزار', ' میلیون', ' میلیارد', ' بیلیون', ' بیلیارد', ' تریلیون', ' تریلیارد', ' کوآدریلیون', ' کادریلیارد', ' کوینتیلیون', ' کوانتینیارد', ' سکستیلیون', ' سکستیلیارد', ' سپتیلیون', ' سپتیلیارد', ' اکتیلیون', ' اکتیلیارد', ' نانیلیون', ' نانیلیارد', ' دسیلیون', ' دسیلیارد',
  ],
]

/**
 * Decimal suffixes for decimal part
 * @type {string[]}
 */
const decimalSuffixes = [
  '',
  'دهم',
  'صدم',
  'هزارم',
  'ده‌هزارم',
  'صد‌هزارم',
  'میلیونوم',
  'ده‌میلیونوم',
  'صدمیلیونوم',
  'میلیاردم',
  'ده‌میلیاردم',
  'صد‌‌میلیاردم',
]

/**
 * Clear number and split to 3 sections
 * @param {*} num
 */
function prepareNumber(num: string | number) {
  let out = num
  if (typeof out === 'number') {
    out = out.toString()
  }

  // make first part 3 chars
  if (out.length % 3 === 1) {
    out = `00${out}`
  }
  else if (out.length % 3 === 2) {
    out = `0${out}`
  }
  // Explode to array
  return out.replace(/\d{3}(?=\d)/g, '$&*').split('*')
}

// tinyNumToWord convert 3tiny parts to word
function tinyNumToWord(num: string) {
  // return zero
  if (Number.parseInt(num, 0) === 0) {
    return ''
  }
  const parsedInt = Number.parseInt(num, 0)
  if (parsedInt < 10) {
    return letters[0][parsedInt]
  }
  if (parsedInt <= 20) {
    return letters[1][parsedInt - 10]
  }
  if (parsedInt < 100) {
    const one = parsedInt % 10
    const ten = (parsedInt - one) / 10
    if (one > 0) {
      return letters[2][ten] + delimiter + letters[0][one]
    }
    return letters[2][ten]
  }
  const one = parsedInt % 10
  const hundreds = (parsedInt - (parsedInt % 100)) / 100
  const ten = (parsedInt - ((hundreds * 100) + one)) / 10
  const out = [letters[3][hundreds]]
  const secondPart = ((ten * 10) + one)

  if (secondPart === 0) {
    return out.join(delimiter)
  }

  if (secondPart < 10) {
    out.push(letters[0][secondPart])
  }
  else if (secondPart <= 20) {
    out.push(letters[1][secondPart - 10])
  }
  else {
    out.push(letters[2][ten])
    if (one > 0) {
      out.push(letters[0][one])
    }
  }

  return out.join(delimiter)
}

/**
 * Convert Decimal part
 * @param decimalPart
 * @returns {string} The Persian word representation of the input number.
 * @constructor
 */
function convertDecimalPart(decimalPart: string) {
  // Clear right zero
  decimalPart = decimalPart.replace(/0*$/, '')

  if (decimalPart === '') {
    return ''
  }

  if (decimalPart.length > 11) {
    decimalPart = decimalPart.substr(0, 11)
  }
  return ` ممیز ${Num2persian(decimalPart)} ${decimalSuffixes[decimalPart.length]}`
}

/**
 * Main function
 * @param input
 * @returns {string} The Persian word representation of the input number.
 * @constructor
 */
function Num2persian(input: string) {
  // Clear Non digits
  input = input.toString().replace(/[^0-9.-]/g, '')
  let isNegative = false
  const floatParse = Number.parseFloat(input)
  // return zero if this isn't a valid number
  if (Number.isNaN(floatParse)) {
    return zero
  }
  // check for zero
  if (floatParse === 0) {
    return zero
  }
  // set negative flag:true if the number is less than 0
  if (floatParse < 0) {
    isNegative = true
    input = input.replace(/-/g, '')
  }

  // Declare Parts
  let decimalPart = ''
  let integerPart = input
  const pointIndex = input.indexOf('.')
  // Check for float numbers form string and split Int/Dec
  if (pointIndex > -1) {
    integerPart = input.substring(0, pointIndex)
    decimalPart = input.substring(pointIndex + 1, input.length)
  }

  if (integerPart.length > 66) {
    return 'خارج از محدوده'
  }

  // Split to sections
  const slicedNumber = prepareNumber(integerPart)
  // Fetch Sections and convert
  const out = []
  for (let i = 0; i < slicedNumber.length; i += 1) {
    const converted = tinyNumToWord(slicedNumber[i])
    if (converted !== '') {
      out.push(converted + letters[4][slicedNumber.length - (i + 1)])
    }
  }

  // Convert Decimal part
  if (decimalPart.length > 0) {
    decimalPart = convertDecimalPart(decimalPart)
  }

  return (isNegative ? negative : '') + out.join(delimiter) + decimalPart
}

export default Num2persian
