<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'
import { useLocalStorage } from '@vueuse/core'
import { ChevronRightIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid'
import {
  TransitionRoot,
  TransitionChild,
  Dialog as Modal,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import InputMultiSelect from '@/components/inputs/MultiSelect.vue'

const isOpen = ref(false)

function closeModal () {
  isOpen.value = false
}
function openModal () {
  isOpen.value = true
}
const config = useRuntimeConfig()
const { t, locale } = useI18n()

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
      title: locale.value === 'fa' ? 'اطلاعات شخصی' : 'Personal Details',
      description: locale.value === 'fa' ? 'لطفا تمام فیلدها را پر کنید' : 'Please fill out all the fields.'
    },
    {
      title: locale.value === 'fa' ? 'اطلاعات خرید' : 'Order Details',
      description: locale.value === 'fa' ? 'لطفا نوع سفارش و مقدار آنرا مشخص کنید تا در اسرع وقت با شما تماس بگیریم' : 'Please select the type of order and the amount of this order.'
    }
  ]
})
const orderContent = ref('')
const ordersTypes = ref<string[]>([])

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

async function submit () {
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
      orderType: ordersTypes.value
    },
    onResponseError: (error) => {
      alert('an error has occured')
      console.error(error)
    }

  })

  if (data?.payload?.customerid) { customerID.value = data.payload.customerid }

  open.value = true

  closeModal()
}

function trySubmit () {
  if (validateOrder() === false || validatePersonalData() === false) {
    return
  }

  openModal()
}

const tabindex = useRouteQuery('tabindex', '0', {
  transform: Number
})

const types = computed(() => {
  return [
    { value: 'personal', title: locale.value === 'fa' ? 'شخص حقیقی' : 'Personal' },
    { value: 'legal', title: locale.value === 'fa' ? 'شخص حقوقی' : 'Legal' }
  ]
})

const summeryInfo = computed(() => {
  return [
    {
      key: cr.value.fullname,
      val: t('FullName')
    },
    {
      key: cr.value.city + ' , ' + cr.value.address,
      val: t('Address')
    },
    {
      key: cr.value.tel,
      val: t('Tel')
    },
    {
      key: ordersTypes.value.length ? ordersTypes.value.join(', ') : '---',
      val: t('OrderTpe')
    },
    {
      key: orderContent.value || '---',
      val: t('orderDescription')
    }

  ]
})

</script>

<template>
  <!-- component -->
  <div class=" flex bg-gray-100 pt-10 pb-20 items-center justify-center">
    <div class="container max-w-screen-lg mx-auto">
      <div>
        <h2 class="font-semibold text-xl text-gray-600">
          <!-- submit new order -->
          {{ t('PlaceAnOrder') }}
        </h2>
        <p class="text-gray-500 mb-6">
          <!-- description of the order -->
          {{ t('submitNewOrder') }}
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

            <div class="lg:col-span-2  border-t pt-5 lg:pt-0 lg:border-t-0">
              <div v-if="currentStep === 0" class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 border-t pt-5 lg:pt-0 lg:border-t-0">
                <div class="md:col-span-2">
                  <!-- <label for="soda">How many soda pops?</label> -->
                  <div
                    class=" gap-4 bg-gray-50 grid grid-cols-2  border border-gray-200 rounded items-center mt-1 p-1"
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
                    {{ types[tabindex].value === 'personal' ? t('FullName') : t('NameAndSurnameOfTheRecipient')
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
                  <label for="address">{{ t('Address') }}</label>
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
                    {{ t('City') }}
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
                    {{ types[tabindex].value === 'personal' ? t('NationalCode') : t('NationalID') }}
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
                    {{ t('PostalCode') }}
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
                      class="bg-blue-500 hover:bg-blue-700 justify-center items-center gap-1 text-white font-bold py-2 px-4 rounded-sm flex rtl:flex-row-reverse"
                      @click="validatePersonalData() && currentStep++"
                    >
                      Order details
                      <ChevronRightIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <div v-else class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 ">
                <div class="md:col-span-5">
                  <label>
                    {{ t('OrderTpe') }}
                  </label>
                  <InputMultiSelect v-model:modelValue="ordersTypes" />
                </div>

                <div class="md:col-span-5">
                  <label for="order_content">
                    {{ t('Order') }}
                  </label>
                  <textarea
                    id="order_content"
                    v-model="orderContent"
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
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded gap-2 flex rtl:flex-row-reverse justify-center items-center"
                      @click="trySubmit"
                    >
                      {{ t('submit') }}
                      <svg class=" w-4" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M2.345 2.245a1 1 0 0 1 1.102-.14l18 9a1 1 0 0 1 0 1.79l-18 9a1 1 0 0 1-1.396-1.211L4.613 13H10a1 1 0 1 0 0-2H4.613L2.05 3.316a1 1 0 0 1 .294-1.071z" clip-rule="evenodd" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="open" class="flex-center fixed h-full w-full  top-0 z-40">
      <div class="bg-black/50 w-full h-full absolute top-0" />
      <div class="w-72  text-green-200 p-6 pb-4 rounded relative bg-green-700">
        <i class="absolute top-2 left-2" @click="open = false">
          <XMarkIcon class="h-6 w-6 text-white bg-green-800/30" />
        </i>
        <h1 class="text-xl flex items-center gap-2">
          <CheckIcon class="h-6 w-6 text-green-300" />
          {{ t("successful") }}
        </h1>
        <p class="mt-4 text-white">
          {{
            t("orderhasbeenplaced") }}
        </p>
        <div class="mt-4 rtl:text-left">
          <button type="button" class="text-green-200 font-bold   hover:bg-green-800 px-4 py-1 rounded-md" @click="open = false">
            {{ t("ok") }}
          </button>
        </div>
      </div>
    </div>

    <TransitionRoot appear :show="isOpen" as="template">
      <Modal as="div" class="relative z-10" @close="closeModal">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900 rtl:text-right"
                >
                  {{ t('orderconfirm') }}
                </DialogTitle>
                <div class="mt-2">
                  <div class="flex flex-col justify-center h-full">
                    <!-- Table -->
                    <div class="w-full max-w-2xl mx-auto   ">
                      <div class="p-3">
                        <div class="overflow-x-auto">
                          <table class="table-auto w-full">
                            <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                              <tr>
                                <th class="p-2 whitespace-nowrap">
                                  <div class="font-semibold text-left">
                                    Name
                                  </div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                  <div class="font-semibold text-left">
                                    Email
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody class="text-sm divide-y divide-gray-100">
                              <tr v-for="(val,key) in summeryInfo" :key="key">
                                <td class="p-2 whitespace-nowrap">
                                  <div class="flex items-center">
                                    <div class=" text-gray-800">
                                      {{ val.val }}
                                    </div>
                                  </div>
                                </td>
                                <td class="p-2 whitespace-nowrap">
                                  <div class="text-left font-medium">
                                    {{ val.key }}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 flex justify-between">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="submit"
                  >
                    {{ t(

                      "orderIsCorrect"
                    ) }}
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent  px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal"
                  >
                    {{ t("close") }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Modal>
    </TransitionRoot>
  </div>
</template>
