<script setup lang="ts">
import {
  Listbox,
  // ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { useVModel } from '@vueuse/core'

const props = defineProps({

  modelValue: {
    type: Array as PropType< string[] >,
    required: true
  }

})

const emit = defineEmits(['update:modelValue'])

const data = useVModel(props, 'modelValue', emit)

const people = [
  'سیست خشک گرید ۱',
  'سیست خشک گرید ۲',
  'سیست خشک گرید ۳',
  'سیست مرطوب گرید ۱',
  'سیست مرطوب گرید ۲',
  'سیست مرطوب گرید ۳',
  'سیست مرطوب هچ ۳۰-۱۰ درصد',
  'سیست مرطوب غیرقابل هچ',
  'سیست دکپسوله خشک',
  'سیست دکپسوله مرطوب',
  'بیومس منجمد',
  'بیومس خشک',
  'بیومس زنده',
  'شیرونومیده'
]

</script>

<template>
  <div class="  w-72">
    <Listbox v-model="data" multiple>
      <div class="relative mt-1">
        <ListboxButton
          class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
        >
          <span class="block truncate text-left rtl:text-right">{{ data.join(', ') }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 ltr:right-0 flex items-center rtl:pl-2 pr-2 rtl:left-0"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-for="(person,inx) in people"
              v-slot="{ active, selected }"
              :key="inx"
              :value="person"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                >{{ person }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>
