<script lang="ts" setup>
import { useRouteQuery } from '@vueuse/router'

const fullname = ref('mahdiyar' + String(~~(Math.random() * 10)))
const tel = ref('09102132')
const address = ref('موحد دانش')
const city = ref('تهران')
const postalCode = ref('123456')
const code = ref('0440379830')
const orderContent = ref('text order ' + String(~~(Math.random() * 10)))

const i18n = useI18n()

async function getCustommer () {
  const date = await $fetch<{ payload: {
              fullname? :string,
              tel? : string,
              address? : string,
              city? : string,
              postalCode? : string,
              code? : string,
            }}>('http://localhost:3032/getcustomer')

  address.value = date.payload.address || ''
  code.value = date.payload.code || ''
  city.value = date.payload.city || ''
  postalCode.value = date.payload.postalCode || ''
  fullname.value = date.payload.fullname || ''
  tel.value = date.payload.tel || ''
}

onMounted(() => {
  getCustommer()
})

async function submitOrder () {
  const x = await $fetch('http://localhost:3032/placeorder', {
    method: 'POST',
    body: {
      fullname: fullname.value,
      city: city.value,
      address: address.value,
      code: code.value,
      tel: tel.value,
      postalCode: postalCode.value,
      orderContent: orderContent.value
    }
  })
  console.log(x)
}

const tabindex = useRouteQuery('tabindex', '0', {
  transform: Number
})

const tabs = computed(() => {
  return [
    { name: 'tab-1', title: i18n.locale.value === 'fa' ? 'شخص حقیقی' : 'Personal' },
    { name: 'tab-2', title: i18n.locale.value === 'fa' ? 'شخص حقوقی' : 'Legal' }
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
            <div class="text-gray-600">
              <p class="font-medium text-lg">
                Personal Details
              </p>
              <p>Please fill out all the fields.</p>
            </div>

            <div class="lg:col-span-2">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div class="md:col-span-2">
                  <label for="soda">How many soda pops?</label>
                  <div class="h-10  gap-4 bg-gray-50 grid grid-cols-2  border border-gray-200 rounded items-center mt-1 p-1">
                    <button
                      v-for="(i,index) in tabs"
                      :key="index"
                      tabindex="-1"
                      for="show_more"
                      class="cursor-pointer outline-none p-1 rounded focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600"
                      :class="tabindex === index ? 'text-blue-600 ring-1 ring-gray-200 bg-white' : ''"
                      @click="tabindex = index"
                    >
                      {{ i.title }}
                    </button>
                  </div>
                </div>

                <div class="md:col-span-5">
                  <label for="full_name">Full Name</label>
                  <input
                    id="full_name"
                    v-model="fullname"
                    type="text"
                    name="full_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                </div>

                <div class="md:col-span-5">
                  <label for="tel">Tel</label>
                  <input
                    id="tel"
                    v-model="tel"
                    type="text"
                    name="tel"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                </div>

                <div class="md:col-span-3">
                  <label for="address">Address / Street</label>
                  <input
                    id="address"
                    v-model="address"
                    type="text"
                    name="address"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                </div>

                <div class="md:col-span-2">
                  <label for="city">City</label>
                  <input
                    id="city"
                    v-model="city"
                    type="text"
                    name="city"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  >
                </div>

                <div class="md:col-span-2">
                  <label for="country">Country / region</label>
                  <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input id="country" name="country" placeholder="Country" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="">
                    <button tabindex="-1" class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                      <svg
                        class="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                      <svg
                        class="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ><polyline points="18 15 12 9 6 15" /></svg>
                    </button>
                  </div>
                </div>

                <div class="md:col-span-2">
                  <label for="state">State / province</label>
                  <div class="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input id="state" name="state" placeholder="State" class="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent" value="">
                    <button tabindex="-1" class="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-red-600">
                      <svg
                        class="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-blue-600">
                      <svg
                        class="w-4 h-4 mx-2 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ><polyline points="18 15 12 9 6 15" /></svg>
                    </button>
                  </div>
                </div>

                <div class="md:col-span-1">
                  <label for="postalCode">postalCode</label>
                  <input
                    id="postalCode"
                    v-model="postalCode"
                    type="text"
                    name="postalCode"
                    class="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder=""
                  >
                </div>

                <div class="md:col-span-5">
                  <div class="inline-flex items-center">
                    <input id="billing_same" type="checkbox" name="billing_same" class="form-checkbox">
                    <label for="billing_same" class="ml-2">My billing address is different than above.</label>
                  </div>
                </div>

                <div class="md:col-span-2">
                  <label for="soda">How many soda pops?</label>
                  <div class="h-10 w-28 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-r border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <input id="soda" name="soda" placeholder="0" class="px-2 text-center appearance-none outline-none text-gray-800 w-full bg-transparent" value="0">
                    <button tabindex="-1" for="show_more" class="cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-500 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 fill-current" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end">
                    <button
                      type="button"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      @click="submitOrder"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="https://www.buymeacoffee.com/dgauderman" target="_blank" class="md:absolute bottom-0 right-0 p-4 float-right">
        <img src="https://www.buymeacoffee.com/assets/img/guidelines/logo-mark-3.svg" alt="Buy Me A Coffee" class="transition-all rounded-full w-14 -rotate-45 hover:shadow-sm shadow-lg ring hover:ring-4 ring-white">
      </a>
    </div>
  </div>
</template>
