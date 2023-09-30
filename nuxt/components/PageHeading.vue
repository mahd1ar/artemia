<script lang="ts" setup>
import { useAppState } from '~/stores/appState'

const { locale, setLocale } = useI18n()
const localePath = useLocalePath()

const appState = useAppState()

function openNav () {
  appState.toggleMenu(true)
}

function chengeLang (newLang : string) {
  setLocale(newLang)
}

</script>

<template>
  <section class="text-white relative h-[80vh] overflow-hidden flex flex-col">
    <div class="absolute w-full h-full">
      <img
        class="h-full object-cover w-full"
        src="https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/freediving-e1633923358732.jpg"
        alt=""
      >
      <div aria-hidden="true" style="background-color: #03062a; opacity: 0.7" class="overlay" />
    </div>

    <div class="relative h-max container mx-auto flex justify-between border-b border-white/50">
      <div class="flex gap-4 text-sm py-4">
        <div class="flex gap-2">
          <!-- location -->
          <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m18.157 16.882l-1.187 1.174c-.875.858-2.01 1.962-3.406 3.312a2.25 2.25 0 0 1-3.128 0l-3.491-3.396c-.44-.431-.806-.794-1.102-1.09a8.707 8.707 0 1 1 12.314 0ZM14.5 11a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"
            />
          </svg>

          {{ appState.contact.address }}
        </div>
        <div class="flex gap-2">
          <!-- mail icon -->
          <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44z"
            />
          </svg>

          {{ appState.contact.email }}
        </div>
      </div>
      <div class="flex items-center gap-4">
        <a :href="appState.contact?.instagram || '#'" target="_blank" title="instagram">
          <span class="sr-only">instagram</span>
          <svg class="w-5" viewBox="0 0 16 16"><path fill="currentColor" d="M8 5.67C6.71 5.67 5.67 6.72 5.67 8S6.72 10.33 8 10.33S10.33 9.28 10.33 8S9.28 5.67 8 5.67ZM15 8c0-.97 0-1.92-.05-2.89c-.05-1.12-.31-2.12-1.13-2.93c-.82-.82-1.81-1.08-2.93-1.13C9.92 1 8.97 1 8 1s-1.92 0-2.89.05c-1.12.05-2.12.31-2.93 1.13C1.36 3 1.1 3.99 1.05 5.11C1 6.08 1 7.03 1 8s0 1.92.05 2.89c.05 1.12.31 2.12 1.13 2.93c.82.82 1.81 1.08 2.93 1.13C6.08 15 7.03 15 8 15s1.92 0 2.89-.05c1.12-.05 2.12-.31 2.93-1.13c.82-.82 1.08-1.81 1.13-2.93c.06-.96.05-1.92.05-2.89Zm-7 3.59c-1.99 0-3.59-1.6-3.59-3.59S6.01 4.41 8 4.41s3.59 1.6 3.59 3.59s-1.6 3.59-3.59 3.59Zm3.74-6.49c-.46 0-.84-.37-.84-.84s.37-.84.84-.84s.84.37.84.84a.8.8 0 0 1-.24.59a.8.8 0 0 1-.59.24Z" /></svg>
        </a>
        <a :href="appState.contact?.telegram || '#'" target="_blank" title="telegram">
          <span class="sr-only">telegram</span>
          <svg class="w-5" viewBox="0 0 512 512"><path fill="currentColor" d="M470.435 45.423L16.827 221.249c-18.254 8.188-24.428 24.585-4.412 33.484l116.37 37.173l281.368-174.79c15.363-10.973 31.091-8.047 17.557 4.024L186.053 341.075l-7.591 93.076c7.031 14.371 19.905 14.438 28.117 7.295l66.858-63.589l114.505 86.187c26.595 15.826 41.066 5.613 46.788-23.394l75.105-357.47c7.798-35.705-5.5-51.437-39.4-37.757z" /></svg>
        </a>
        <a :href="appState.contact?.whatsapp || '#'" target="_blank" title="Whatsapp">
          <span class="sr-only">Whatsapp</span>
          <svg class="w-5" viewBox="0 0 16 16"><path fill="currentColor" d="M13.95 4.24C11.86 1 7.58.04 4.27 2.05C1.04 4.06 0 8.44 2.09 11.67l.17.26l-.7 2.62l2.62-.7l.26.17c1.13.61 2.36.96 3.58.96c1.31 0 2.62-.35 3.75-1.05c3.23-2.1 4.19-6.39 2.18-9.71Zm-1.83 6.74c-.35.52-.79.87-1.4.96c-.35 0-.79.17-2.53-.52c-1.48-.7-2.71-1.84-3.58-3.15c-.52-.61-.79-1.4-.87-2.19c0-.7.26-1.31.7-1.75c.17-.17.35-.26.52-.26h.44c.17 0 .35 0 .44.35c.17.44.61 1.49.61 1.58c.09.09.05.76-.35 1.14c-.22.25-.26.26-.17.44c.35.52.79 1.05 1.22 1.49c.52.44 1.05.79 1.66 1.05c.17.09.35.09.44-.09c.09-.17.52-.61.7-.79c.17-.17.26-.17.44-.09l1.4.7c.17.09.35.17.44.26c.09.26.09.61-.09.87Z" /></svg>
        </a>
      </div>
    </div>

    <div class="relative h-full container mx-auto flex flex-col">
      <div class="flex shrink-0 justify-between items-center">
        <div class="p-2 py-1 text-3xl border-2 my-2">
          lorem
        </div>
        <div>
          <ul class="flex-center gap-10 capitalize">
            <li v-for="(mi,index) in appState.menuItems" :key="index">
              <NuxtLink :to="localePath(mi.link)">
                {{ locale === 'en' ? mi.en : mi.fa }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="flex gap-4 ">
          <div class="tracking-widest flex items-center gap-2">
            <button type="button" @click="chengeLang('fa')">
              FA
            </button>
            <button type="button" @click="chengeLang('en')">
              EN
            </button>
          </div>

          <div @click="openNav">
            <svg class="w-10" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 17h7M5 12h14M5 7h14"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="h-full flex-center justify-between w-full">
        <div class="w-1/3">
          <ol class="flex items-start gap-5 flex-col capitalize">
            <li class="pb-1 pr-2 border-primary border-b-2">
              Section 1
            </li>
            <li class="pb-1 pr-2 border-primary border-b-2">
              section 2
            </li>
            <li class="pb-1 pr-2 border-primary border-b-2">
              section 3
            </li>
            <li class="pb-1 pr-2 border-primary border-b-2">
              section 4
            </li>
          </ol>
        </div>
        <div class="text-right w-2/3">
          <h1 class="text-5xl font-bold">
            IRAN ARTEMIA
          </h1>
          <div class="text-gray-200 mt-10 italic font-bold">
            Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Aliquam tenetur deserunt, neque vitae dolorum
            fugiat mollitia expedita cupiditate, blanditiis
            provident inventore necessitatibus voluptatibus rerum a
            libero quod impedit, modi reiciendis!
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
