<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import { useLocalStorage } from '@vueuse/core'
import { ChevronRightIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import InputMultiSelect from '@/components/inputs/MultiSelect.vue'

const config = useRuntimeConfig()

function ssnValidator (val : string) {
  const allDigitEqual = ['0000000000', '1111111111', '2222222222', '3333333333', '4444444444', '5555555555', '6666666666', '7777777777', '8888888888', '9999999999']
  const codeMelliPattern = /^([0-9]{10})+$/

  if (allDigitEqual.includes(val) || !codeMelliPattern.test(val)) {
    return false
  }

  const chArray = Array.from(val)
  const num0 = parseInt(chArray[0]) * 10
  const num2 = parseInt(chArray[1]) * 9
  const num3 = parseInt(chArray[2]) * 8
  const num4 = parseInt(chArray[3]) * 7
  const num5 = parseInt(chArray[4]) * 6
  const num6 = parseInt(chArray[5]) * 5
  const num7 = parseInt(chArray[6]) * 4
  const num8 = parseInt(chArray[7]) * 3
  const num9 = parseInt(chArray[8]) * 2
  const a = parseInt(chArray[9])
  const b = (((((((num0 + num2) + num3) + num4) + num5) + num6) + num7) + num8) + num9
  const c = b % 11
  return (((c < 2) && (a === c)) || ((c >= 2) && ((11 - c) === a)))
}

const open = ref(false)
const customerID = useLocalStorage('customerID', '')
const cr = useLocalStorage('credentials', {
  fullname: '',
  tel: '',
  address: '',
  city: '',
  postalCode: '',
  code: ''
})

const currentStep = useRouteQuery('step', '0', {
  transform: Number
})
const steps = computed(() => {
  return [
    {
      title: i18n.locale.value === 'fa' ? 'اطلاعات شخصی' : 'Personal Details',
      description: i18n.locale.value === 'fa' ? 'لطفا تمام فیلدها را پر کنید' : 'Please fill out all the fields.'
    },
    {
      title: i18n.locale.value === 'fa' ? 'اطلاعات خرید' : 'Order Details',
      description: i18n.locale.value === 'fa' ? 'لطفا نوع سفارش و مقدار آنرا مشخص کنید تا در اسرع وقت با شما تماس بگیریم' : 'Please select the type of order and the amount of this order.'
    }
  ]
})
const orderContent = ref('text order ' + String(~~(Math.random() * 10)))
const ordersTypes = ref<string[]>([

])
const i18n = useI18n()

function validatePersonalData () {
  if (
    !cr.value.code ||
    !cr.value.fullname || !cr.value.tel || !cr.value.address || !cr.value.city || !cr.value.postalCode
  ) {
    alert('تمام فیلدها را پر کنید')
    return false
  }
  if (cr.value.code.length !== 10) {
    alert('کد ملی اشتباه است')
    return false
  } else if (types.value[0].value === 'personal') {
    if (!ssnValidator(cr.value.code)) {
      alert('کد ملی معتبر نیست')
      return false
    }
  }

  return true
}

function validateOrder () {
  const _orderTypes = ordersTypes.value
  const _orderContent = orderContent.value

  if (_orderTypes.length === 0) {
    alert('Please specify the order type')
    return false
  }

  if (_orderContent.length === 0) {
    alert('Please specify the order content')
    return false
  }

  return true
}

async function submitOrder () {
  if (validateOrder() === false || validatePersonalData() === false) {
    return
  }

  type NuxtFetchResponse = {
    message: string,
    payload: {
      customerid: string,
      orderid: string,
    },
  }

  const data = await $fetch<NuxtFetchResponse>(config.public.apiUrl + '/placeorder', {
    method: 'POST',
    body: {
      // id: customerID.value,
      fullname: cr.value.fullname,
      city: cr.value.city,
      address: cr.value.address,
      code: cr.value.code,
      tel: cr.value.tel,
      postalCode: cr.value.postalCode,
      orderContent: orderContent.value,
      orderTypes: ordersTypes.value
    },
    onResponseError: (error) => {
      alert('an error has occured')
      console.error(error)
    },
    
  })

  if (data?.payload?.customerid) { customerID.value = data.payload.customerid }

  open.value = true
}

const tabindex = useRouteQuery('tabindex', '0', {
  transform: Number
})

const types = computed(() => {
  return [
    { value: 'personal', title: i18n.locale.value === 'fa' ? 'شخص حقیقی' : 'Personal' },
    { value: 'legal', title: i18n.locale.value === 'fa' ? 'شخص حقوقی' : 'Legal' }
  ]
})

</script>

<template>
  <!-- component -->
  <div class="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
    <div class="container max-w-screen-lg mx-auto">
      <div>
        <h2 class="font-semibold text-xl text-gray-600">
          Responsive Form
        </h2>
        <p class="text-gray-500 mb-6">
          Form is mobile responsive. Give it a try.
        </p>

        <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="text-gray-600 flex flex-col gap-4">
              <div
                v-for="(s,i) in steps"
                :key="i"
                class="hover:bg-slate-100 cursor-pointer rounded p-4 transition-all"
                :class="currentStep === i ? 'ltr:border-l-4 rtl:border-r-4 px-5 border-blue-600 bg-slate-50' : ''"

                @click="currentStep = i"
              >
                <p class="font-medium text-lg">
                  {{ s.title }}
                </p>
                <p>
                  {{ s.description }}
                </p>
              </div>
            </div>

            <div class="lg:col-span-2">
              <div v-if="currentStep === 0" class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div class="md:col-span-2">
                  <label for="soda">How many soda pops?</label>
                  <div
                    class="h-10  gap-4 bg-gray-50 grid grid-cols-2  border border-gray-200 rounded items-center mt-1 p-1"
                  >
                    <button
                      v-for="(i, index) in types"
                      :key="index"
                      tabindex="-1"
                      for="show_more"
                      class="cursor-pointer outline-none p-1 rounded focus:outline-none border-r border-gray-200 transition-all  hover:text-black"
                      :class="tabindex === index ? 'text-blue-600 ring-1 ring-gray-200 bg-white' : 'text-gray-500'"
                      @click="tabindex = index"
                    >
                      {{ i.title }}
                    </button>
                  </div>
                </div>

                <div class="md:col-span-5">
                  <label for="full_name">
                    {{ types[tabindex].value === 'personal' ? i18n.t('FullName') : i18n.t('NameAndSurnameOfTheRecipient')
                    }}
                  </label>
                  <input
                    id="full_name"
                    v-model="cr.fullname"
                    type="text"
                    name="full_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                </div>

                <div class="md:col-span-5">
                  <label for="tel">Tel</label>
                  <input
                    id="tel"
                    v-model="cr.tel"
                    type="text"
                    name="tel"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                </div>

                <div class="md:col-span-3">
                  <label for="address">{{ i18n.t('Address') }}</label>
                  <input
                    id="address"
                    v-model="cr.address"
                    type="text"
                    name="address"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                </div>

                <div class="md:col-span-2">
                  <label for="city">
                    {{ i18n.t('City') }}
                  </label>
                  <input
                    id="city"
                    v-model="cr.city"
                    type="text"
                    name="city"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                </div>

                <div class="md:col-span-3">
                  <label for="code">
                    {{ types[tabindex].value === 'personal' ? i18n.t('NationalCode') : i18n.t('NationalID') }}
                  </label>
                  <input
                    id="code"
                    v-model="cr.code"
                    type="text"
                    name="code"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                </div>

                <div class="md:col-span-2">
                  <label for="postalCode">
                    {{ i18n.t('PostalCode') }}
                  </label>
                  <input
                    id="postalCode"
                    v-model="cr.postalCode"
                    type="text"
                    name="postalCode"
                    class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder=""
                  >
                </div>

                <div class="md:col-span-5 ltr:text-right rtl:text-left">
                  <div class="inline-flex items-end">
                    <button
                      type="button"
                      class="bg-blue-500 hover:bg-blue-700 flex-center gap-1 text-white font-bold py-2 px-4 rounded-sm"
                      @click="validatePersonalData() && currentStep++"
                    >
                      Order details
                      <ChevronRightIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div class="md:col-span-5">
                  <label>
                    {{ i18n.t('OrderTpe') }}
                  </label>
                  <InputMultiSelect v-model:modelValue="ordersTypes" />
                </div>

                <div class="md:col-span-5">
                  <label for="order_content">
                    {{ types[tabindex].value === 'personal' ? i18n.t('FullName') : i18n.t('NameAndSurnameOfTheRecipient')
                    }}
                  </label>
                  <textarea
                    id="order_content"
                    v-model="cr.fullname"
                    rows="5"
                    type="text"
                    name="order_content"
                    class=" border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>

                <div class="md:col-span-5 ltr:text-right rtl:text-left ">
                  <div class="inline-flex items-end">
                    <button
                      type="button"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      @click="submitOrder"
                    >
                      {{ i18n.t('submit') }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://www.buymeacoffee.com/dgauderman"
        target="_blank"
        class="md:absolute bottom-0 right-0 p-4 float-right"
      >
        <img
          src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg"
          alt="Buy Me A Coffee"
          class="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white"
        >
      </a>
    </div>
    <div v-if="open" class="flex-center fixed h-full w-full  top-0 z-40">
      <div class="bg-black/50 w-full h-full absolute top-0" />
      <div class="w-72  text-green-200 p-6 pb-4 rounded relative bg-green-700">
        <i class="absolute top-2 left-2" @click="open = false">
          <XMarkIcon class="h-6 w-6 text-white bg-green-800/30" />
        </i>
        <h1 class="text-xl flex items-center gap-2">
          <CheckIcon class="h-6 w-6 text-green-300" />
          {{ i18n.t("successful") }}
        </h1>
        <p class="mt-4 text-white">
          {{
            i18n.t("orderhasbeenplaced") }}
        </p>
        <div class="mt-4 rtl:text-left">
          <button type="button" class="text-green-200 font-bold   hover:bg-green-800 px-4 py-1 rounded-md" @click="open = false">
            {{ i18n.t("ok") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
