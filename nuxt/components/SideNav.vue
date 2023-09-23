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
    class="fixed top-0 h-full w-96 bg-gray-50 p-0 m-0 ml-auto  z-10 ease-in-out transition-transform duration-150 delay-75   right-0"
    :class="appStore.isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="px-12 overflow-auto">
      <div class="mx-auto w-full flex-col ">
        <!-- close button -->
        <div class="mt-6 w-full text-right">
          <div class="bg-gray-100 text-gray-500 flex items-center justify-center w-10 h-10 rounded flex-col inline-flex" @click="appStore.toggleMenu(false)">
            <svg class="inline-block" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" /></svg>
          </div>
        </div>
        <div class=" inline-block mt-10">
          <GovarKavirLogo  />
        </div>
        <div class="text-gray-400 mt-6" >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos maxime ipsa velit impedit debitis nostrum vero perspiciatis quos reprehenderit, sapiente neque molestiae sequi soluta quasi corporis cupiditate. Error, temporibus dolorem!
        </div>
        <!-- <div class="flex flex-col w-full">
          <button type="button" class="bg-teal-500 w-full flex-shrink-0 text-teal-100 capitalize  text-xl font-bold mt-20 mb-10 py-3 px-4 rounded-md">
            Place an order
          </button>
        </div> -->
        <strong class="text-lg py-5 inline-block mt-5 uppercase tracking-widest" >
          Contact US
        </strong>
        <ul class="w-full text-gray-500 flex flex-col gap-0.5">
          <li class=""  >
            <svg class="text-primary w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8Z"/></g></svg>
            {{ locale === 'en' ? appStore.contact.address : appStore.contact.addressFa }} </li>
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
