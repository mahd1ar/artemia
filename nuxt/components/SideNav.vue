<script lang="ts" setup>
import { useAppState } from '@/stores/appState'

const appStore = useAppState()
const { locale } = useI18n()
const dialog = ref<HTMLDialogElement|null>(null)

watch(() => appStore.isMenuOpen, (isMenuOpen) => {
  if (isMenuOpen) {
    dialog.value?.showModal()
  } else {
    setTimeout(() => {
      dialog.value?.close()
    },

    dialog.value
      ? +getComputedStyle(dialog.value).transitionDuration.replace('s', '') * 1000

      : 150)
  }
})

</script>

<template>
  <dialog
    ref="dialog"
    class="fixed top-0 h-full w-96 bg-gray-950 p-0 m-0 ml-auto text-teal-600 z-10 ease-in-out transition-transform duration-150 delay-75   right-0"
    :class="appStore.isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="px-6 overflow-auto">
      <div class="mx-auto w-full flex-col flex-center">
        <div class="mt-6 w-full left-0">
          <div class="bg-gray-800 text-gray-500 flex items-center justify-center w-10 h-10 rounded flex-col" @click="appStore.toggleMenu(false)">
            <svg class="inline-block" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" /></svg>
          </div>
        </div>
        <div class="flex-col gap-2 flex-center">
          <img class="w-20 mt-10 rounded-full" src="/iranartemia-logo.jpg" alt="">
          <strong class="capitalize text-2xl text-white"> iran artemia </strong>
        </div>
        <div class="flex flex-col w-full">
          <button type="button" class="bg-teal-500 w-full flex-shrink-0 text-teal-100 capitalize  text-xl font-bold mt-20 mb-10 py-3 px-4 rounded-md">
            Place an order
          </button>
        </div>
        <ul class="w-full divide-y-2 divide-white/10 flex flex-col gap-0.5">
          <li v-for="(menu,index) in appStore.menuItems" :key="index" class="text-white w-full   ">
            <NuxtLink :to="menu.link " class="flex justify-between p-2 hover:bg-teal-700/20">
              {{ locale === 'fa' ? menu.fa : menu.en }}

              <div class="w-8 h-8 bg-teal-950 bg-opacity-50 rounded flex-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6l-6-6z" /></svg>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </dialog>
</template>

<style scoped>

dialog::backdrop {
    position: fixed;
    inset: 0px;
    background: rgba(0, 20, 9, 0.37);

}
</style>
