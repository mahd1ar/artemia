<script lang="ts" setup>
import { useAppState } from '~/stores/appState'

const appState = useAppState()
const { locale, localeCodes, setLocale, t } = useI18n()

const translatePanel = ref(false)
const localePath = useLocalePath()
function changeLocale (newLocale : string) {
  translatePanel.value = false
  setLocale(newLocale)
}
const config = useRuntimeConfig()

</script>

<template>
  <section class="min-h-screen grid text-black relative">
    <div class="absolute w-full h-full " id="background" aria-hidden="true" ></div>
    <div
      class="relative min-full flex flex-col justify-between w-full overflow-hidden"
    >
      <div class="w-full">
        <!-- TODO temp hidden -->
        <!-- This example requires Tailwind CSS v2.0+ -->
        <nav class="bg-white shadow">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 justify-between">
              <div class="flex">
                <div class="-ml-2 mr-2 flex items-center md:hidden">
                  <!-- Mobile menu button -->
                  <button type="button" class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <!--
              Icon when menu is closed.

              Heroicon name: outline/bars-3

              Menu open: "hidden", Menu closed: "block"
            -->
                    <svg
                      class="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <!--
              Icon when menu is open.

              Heroicon name: outline/x-mark

              Menu open: "block", Menu closed: "hidden"
            -->
                    <svg
                      class="hidden h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="flex flex-shrink-0 items-center">
                  <svg fill="currentColor" class="block h-8 w-auto lg:hidden text-teal-600" viewBox="0 0 283.46 283.44">

                    <g>
                      <g>
                        <path class="cls-1" d="m211.53,265.08v.02s.1-.07.15-.1c-.05.02-.1.05-.15.07Zm-73.45,18.31c.51.02,1.05.05,1.59.05.22,0,.46,0,.68-.02-.76,0-1.52,0-2.27-.02Z" />
                        <path class="cls-1" d="m141.74,0C63.48,0,0,63.45,0,141.72s57.78,135.85,131.03,141.3c1.12.1,2.27.17,3.42.22,1.2.07,2.42.12,3.62.15.76.02,1.52.02,2.27.02,4.47-.05,8.88-.39,13.18-.95,41.03-7.97,57.22-36.85,55.14-80.42-2.08-44.18-35.14-69.88-56.46-91.37-17.02-17.16-43.25-44.73-45.82-56.46-1.38-6.26,6.31-19.27,9.98-26.51.9-1.76,1.59-2.98,1.86-3.37,1.22-1.71,4.02-1.48,6.43,2.01,18.04,26.09,35.41,46.28,76.46,91.28,54.34,59.56,14.77,137.54,10.42,147.47.05-.02.1-.05.15-.07,42.86-24.35,71.79-70.44,71.79-123.28C283.46,63.45,220.01,0,141.74,0Zm4.99,130.64c42.72,36.09,53.06,83.79,35.14,108.3-15.89,21.74-35.8,19.83-44.45,12.37-18-15.5,12.74-30.61,12.74-30.61,0,0-22.54-4.87-46.24-3.42,17.9-17.04,40.66-16.65,40.66-16.65,0,0-30.1-15.77-62.42-18.34,36.75-19.78,55.6-14.28,55.6-14.28,0,0-38.85-19.22-66.24-21.44,23.18-11.96,41.9-11.14,41.9-11.14,0,0-9.08-3.01-23.44-25.58-12.64-19.87,1.13-43.53,1.13-43.53,0,0,10.19,25.92,55.62,64.33Z" />
                      </g>
                    </g>
                  </svg>

                  <svg fill="currentColor" class="hidden h-8 w-auto lg:block text-teal-600" stroke-width="0px" viewBox="0 0 261.66 77.05">

                    <g>
                      <path class="cls-1 " d="m242.11,72.05h0s.03-.01.04-.02c-.01,0-.03.01-.04.02Zm-19.97,4.98c.14,0,.29.01.43.01.06,0,.13,0,.19,0-.21,0-.41,0-.62,0Z" />
                      <path class="cls-1 " d="m223.14,0c-21.28,0-38.53,17.25-38.53,38.52s15.71,36.93,35.62,38.41c.31.03.62.05.93.06.33.02.66.03.98.04.21,0,.41,0,.62,0,1.22-.01,2.41-.11,3.58-.26,11.15-2.17,15.55-10.02,14.99-21.86-.56-12.01-9.55-19-15.35-24.84-4.63-4.67-11.76-12.16-12.46-15.35-.37-1.7,1.71-5.24,2.71-7.2.25-.48.43-.81.51-.92.33-.47,1.09-.4,1.75.55,4.9,7.09,9.62,12.58,20.78,24.81,14.77,16.19,4.01,37.39,2.83,40.08.01,0,.03-.01.04-.02,11.65-6.62,19.51-19.15,19.51-33.51,0-21.28-17.25-38.52-38.52-38.52Zm1.36,35.51c11.61,9.81,14.42,22.78,9.55,29.44-4.32,5.91-9.73,5.39-12.08,3.36-4.89-4.21,3.46-8.32,3.46-8.32,0,0-6.13-1.32-12.57-.93,4.87-4.63,11.05-4.53,11.05-4.53,0,0-8.18-4.29-16.97-4.98,9.99-5.38,15.11-3.88,15.11-3.88,0,0-10.56-5.22-18.01-5.83,6.3-3.25,11.39-3.03,11.39-3.03,0,0-2.47-.82-6.37-6.95-3.44-5.4.31-11.83.31-11.83,0,0,2.77,7.04,15.12,17.49Z" />
                    </g>
                    <g class="">
                      <path class="cls-1" d="m0,57.12h4.95v17.32H0v-17.32Z" />
                      <path class="cls-1" d="m16.85,74.41l-2.75-5.44h-1.24v5.44h-4.95v-17.32h6.93c1.9,0,3.46.56,4.7,1.67,1.24,1.11,1.86,2.58,1.86,4.42,0,1.02-.24,1.95-.71,2.77-.47.82-1.13,1.49-1.97,2l3.41,6.46h-5.29Zm-3.98-12.77v3.22h1.88c.53.02.94-.11,1.25-.4.3-.28.46-.68.46-1.19s-.15-.91-.46-1.2c-.31-.29-.72-.43-1.25-.43h-1.88Z" />
                      <path class="cls-1" d="m34.39,74.44l-.59-2.23h-5l-.59,2.23h-5.32l5.52-17.32h5.79l5.52,17.32h-5.32Zm-4.53-6.18h2.87l-1.44-5.32-1.44,5.32Z" />
                      <path class="cls-1" d="m50.59,57.12h4.95v17.32h-3.96l-5.44-7.92v7.92h-4.95v-17.32h3.96l5.44,7.92v-7.92Z" />
                      <path class="cls-1" d="m73.97,74.44l-.59-2.23h-5l-.59,2.23h-5.32l5.52-17.32h5.79l5.52,17.32h-5.32Zm-4.53-6.18h2.87l-1.44-5.32-1.44,5.32Z" />
                      <path class="cls-1" d="m89.71,74.41l-2.75-5.44h-1.24v5.44h-4.95v-17.32h6.93c1.9,0,3.46.56,4.7,1.67,1.24,1.11,1.86,2.58,1.86,4.42,0,1.02-.23,1.95-.7,2.77-.47.82-1.13,1.49-1.97,2l3.41,6.46h-5.29Zm-3.98-12.77v3.22h1.88c.53.02.94-.11,1.25-.4s.46-.68.46-1.19-.15-.91-.46-1.2-.72-.43-1.25-.43h-1.88Z" />
                      <path class="cls-1" d="m108.49,57.12v4.8h-4.08v12.52h-4.95v-12.52h-4.08v-4.8h13.11Z" />
                      <path class="cls-1" d="m115.42,69.88h6.43v4.55h-11.38v-17.32h11.26v4.5h-6.31v1.88h5.69v4.45h-5.69v1.93Z" />
                      <path class="cls-1" d="m142.38,57.12v17.32h-4.95v-8.44l-3.86,6.48h-.44l-3.86-6.48v8.44h-4.95v-17.32h4.95l4.08,7.05,4.08-7.05h4.95Z" />
                      <path class="cls-1" d="m145.35,57.12h4.95v17.32h-4.95v-17.32Z" />
                      <path class="cls-1" d="m163.29,74.44l-.59-2.23h-5l-.59,2.23h-5.32l5.52-17.32h5.79l5.52,17.32h-5.32Zm-4.53-6.18h2.87l-1.44-5.32-1.43,5.32Z" />
                    </g>
                    <g class="">
                      <path class="cls-1" d="m1.36,31.12V13.73h5.97v17.26c0,.33.11.6.33.82.22.22.49.33.82.33h1.73c.16,0,.3.06.41.19s.17.27.17.43v5.8c0,.38-.19.58-.58.58h-.82c-1.1,0-2.14-.21-3.13-.64-.99-.42-1.84-.99-2.55-1.71-.71-.71-1.28-1.56-1.71-2.55-.43-.99-.64-2.03-.64-3.13Z" />
                      <rect class="cls-1" x="14.41" y="23.93" width="5.97" height="8.21" />
                      <rect class="cls-1" x="3.97" y="44.08" width="10.7" height="5.56" />
                      <path class="cls-1" d="m26.47,32.35c-.12-.14-.27-.21-.43-.21h-15.84c-.14,0-.27.06-.39.19s-.19.27-.19.43v5.8c0,.14.06.27.19.39s.25.19.39.19h3.29c.88,0,1.72-.16,2.53-.47.81-.31,1.57-.87,2.28-1.67.63.8,1.32,1.35,2.06,1.67.74.32,1.54.47,2.39.47h3.29c.17,0,.31-.06.43-.19s.19-.25.19-.39v-5.8c0-.14-.06-.27-.19-.41Z" />
                      <path class="cls-1" d="m48.88,32.81c0-.17.05-.31.16-.45s.25-.21.41-.21h2.96c1.78.02,3.22-1.42,3.22-3.2v-5.02s5.92,0,5.92,0v7.02c0,1.13-.21,2.19-.64,3.19-.43,1-1.01,1.87-1.75,2.61s-1.61,1.32-2.61,1.75c-1,.43-2.06.64-3.19.64h-3.91c-.17,0-.3-.06-.41-.19s-.16-.25-.16-.39v-5.76Z" />
                      <path class="cls-1" d="m112.5,23.93v15.28c0,.96-.27,1.82-.82,2.57-.55.75-1.28,1.28-2.18,1.58h0c-3.18,1.22-6.7,1.22-9.87,0h0c-.91-.3-1.63-.83-2.18-1.58-.55-.75-.82-1.61-.82-2.57v-11.36h-5.93v10.74c0,1.18.18,2.31.54,3.39s.86,2.08,1.5,2.98c.64.9,1.42,1.7,2.32,2.39.9.69,1.91,1.21,3,1.56h0c4.21,1.44,8.79,1.44,13,0h0c1.1-.36,2.1-.88,3-1.56.91-.69,1.68-1.48,2.32-2.39.65-.91,1.15-1.9,1.5-2.98s.54-2.22.54-3.39v-14.66h-5.93Z" />
                      <path class="cls-1" d="m57.82,44.92l6.97-2.69c.91-.3,1.63-.83,2.18-1.58.55-.75.82-1.61.82-2.57v-14.14h5.93v13.52c0,1.18-.18,2.31-.54,3.39s-.86,2.08-1.5,2.98c-.64.9-1.42,1.7-2.32,2.39-.9.69-1.91,1.21-3,1.56l-6.5,2.22-2.04-5.09Z" />
                      <path class="cls-1" d="m79.27,13.73h5.97v25.41h-5.97V13.73Z" />
                      <path class="cls-1" d="m127.79,39.14h-5.92V13.73h5.92v25.41Z" />
                      <rect class="cls-1" x="146.7" y="44.08" width="10.7" height="5.56" />
                      <path class="cls-1" d="m167.25,39.14h-5.93V13.73h5.93v25.41Z" />
                      <rect class="cls-1" x="50.85" y="13.73" width="10.7" height="5.56" />
                      <rect
                        class="cls-1"
                        x="101.56"
                        y="25.08"
                        width="5.56"
                        height="5.56"
                        transform="translate(132.19 -76.48) rotate(90)"
                      />
                      <path class="cls-1" d="m151.47,23.93l.02,5.5c0,1.5-1.21,2.72-2.71,2.72h-4.9c-1.89,0-3.42-1.53-3.42-3.42v-4.79h-5.93v14.14c0,.96-.27,1.82-.82,2.57-.55.75-1.28,1.28-2.18,1.58l-6.97,2.69,2.04,5.09,6.5-2.22c1.1-.36,2.1-.88,3-1.56.91-.69,1.68-1.48,2.32-2.39.65-.91,1.15-1.9,1.5-2.98s.54-2.22.54-3.39v-.58c.65,1.09,1.88,2.27,4.21,2.27v-.02c.13,0,.26.02.41.02h4.13c1.13,0,2.19-.21,3.19-.64,1-.42,1.87-1.01,2.61-1.75s1.32-1.61,1.75-2.61c.42-1,.64-2.06.64-3.19v-7.02h-5.93Z" />
                      <path class="cls-1" d="m78.48,2.61c-1.18,0-2.31.18-3.39.54s-2.08.86-2.98,1.5c-.13.09-.24.2-.36.3l2.51,5.5c.28-.41.62-.78,1.04-1.08.75-.55,1.61-.82,2.57-.82h12.47V2.61h-11.85Z" />
                      <path class="cls-1" d="m49.85,32.31c-.12-.11-.25-.17-.39-.17h-1.81c-.3,0-.57-.12-.8-.35s-.35-.51-.35-.84v-2.47c0-1.04-.2-2.03-.6-2.96s-.94-1.74-1.63-2.43-1.49-1.23-2.41-1.63c-.92-.4-1.9-.6-2.94-.6h-2.17c-.79,0-1.58.1-2.33.35-.91.31-1.72.75-2.42,1.33-.63.52-1.17,1.14-1.61,1.85-.44.71-.74,1.5-.91,2.34l-.82,4.28c-.08.33-.25.6-.49.8-.25.21-.55.31-.9.31h-1.23c-.38,0-.58.18-.58.54v5.88c0,.16.06.3.19.41.12.11.25.17.39.17h2.74c.85,0,1.66-.15,2.43-.45,0,0,.02,0,.02,0,1.28-.51,2.14-1.74,2.43-3.09l1.6-7.32c.14-.38.38-.58.74-.58h3.83c.22,0,.39.07.52.21s.2.31.23.53v3.7h-5.28s1.82,4.08,2.11,4.74,1.14,2.56,4.66,2.02c.14-.02.26-.07.36-.12.67-.28,1.29-.66,1.81-1.3.55.66,1.22,1.1,2.02,1.32.8.22,1.59.33,2.39.33h.82c.14,0,.27-.06.39-.19s.19-.27.19-.43v-5.8c0-.17-.06-.3-.19-.41Z" />
                    </g>

                  </svg>
                </div>
                <div class="hidden ltr:md:ml-6 rtl:md:mr-6 md:flex md:gap-8 desktop">
                  <!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->

                  <NuxtLink
                    v-for="(i , index) in appState.menuItems"
                    :key="index"
                    :to="localePath(i.link.replace(config.public.frontendUrl, ''))"
                    class="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    {{
                      locale === 'fa' ? i.fa : i.en }}
                  </NuxtLink>
                </div>
              </div>

              <div class="flex items-center md:gap-4">
                <div class="flex-shrink-0">
                  <NuxtLink :to="localePath('/placeanorder')" class="relative gap-2 inline-flex items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-700 ">
                    <!-- Heroicon name: mini/plus -->
                    <svg class=" h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <span>{{ t('PlaceAnOrder') }}</span>
                  </NuxtLink>
                </div>
                <div class="hidden  md:flex md:flex-shrink-0 md:items-center">
                  <button type="button" class="rounded-full  relative bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="translatePanel = !translatePanel">
                    <span class="sr-only">translate</span>

                    <svg class="h-7 w-7 text-gray-600" :aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2ZM10 2v2h6v2h-1.968a18.221 18.221 0 0 1-3.62 6.301a14.865 14.865 0 0 0 2.335 1.707l-.75 1.878A17.016 17.016 0 0 1 9 13.725a16.677 16.677 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.031 16.031 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2Zm7.5 10.885L16.253 16h2.492L17.5 12.885Z" /></svg>

                    <ClientOnly>
                      <Transition>
                        <div
                          v-show="translatePanel"
                          class="absolute ltr:right-0 rtl:left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu-button"
                          tabindex="-1"
                        >
                          <!-- Active: "bg-gray-100", Not Active: "" -->

                          <button
                            v-for="i in localeCodes"
                            :key="i"

                            type="button"
                            class="block w-full text-left px-4 py-2 text-sm text-gray-700"
                            :class="[locale === i && 'bg-gray-100' ]"
                            role="menuitem"
                            tabindex="-1"
                            @click="changeLocale(i)"
                          >
                            {{

                              i === 'fa' ? 'فارسی' : 'english'

                            }}
                          </button>
                        </div>
                      </Transition>
                    </ClientOnly>
                  </button>

                  <!-- Profile  -->
                  <div v-if="false" class="relative ml-3">
                    <div>
                      <button id="user-menu-button" type="button" class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" aria-expanded="false" aria-haspopup="true">
                        <span class="sr-only">Open user menu</span>
                        <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                      </button>
                    </div>

                    <!--
              Dropdown menu, show/hide based on menu state.

              Entering: "transition ease-out duration-200"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            -->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile menu, show/hide based on menu state. -->
          <div id="mobile-menu" class="md:hidden">
            <div class="space-y-1 pt-2 pb-3">
              <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
              <a href="#" class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6">
                {{ t('Home') }}
              </a>
              <NuxtLink v-for="(i , index) in appState.menuItems" :key="index" :to="localePath(i.link)" class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6">
                {{
                  locale === 'fa' ? i.fa : i.en
                }}
              </NuxtLink>
            </div>
            <div class="border-t border-gray-200 pt-4 pb-3">
              <div class="flex items-center px-4 sm:px-6">
                <div class="flex-shrink-0">
                  <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                </div>
                <div class="ml-3">
                  <div class="text-base font-medium text-gray-800">
                    Tom Cook
                  </div>
                  <div class="text-sm font-medium text-gray-500">
                    tom@example.com
                  </div>
                </div>
                <button type="button" class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span class="sr-only">View notifications</span>
                  <!-- Heroicon name: outline/bell -->
                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </button>
              </div>
              <div class="mt-3 space-y-1">
                <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6">Your Profile</a>
                <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6">Settings</a>
                <a href="#" class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6">Sign out</a>
              </div>
            </div>
          </div>
        </nav>

        <main class="mt-10">
          <slot />
        </main>
      </div>
      <FooterSection class="mt-28" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.desktop {
    .router-link-active {
        --tw-border-opacity: 1;
        border-color: rgb(99 102 241 / var(--tw-border-opacity));
        color:rgb(17, 24, 39) ;
    }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

</style>
