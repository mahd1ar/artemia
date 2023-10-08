<script lang="ts" setup>
import { useAppState } from '@/stores/appState'

const appStore = useAppState()
const { locale, t } = useI18n()

const localePath = useLocalePath()

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
          <GovarKavirLogo />
        </div>
        <div class="text-gray-400 mt-6">
          {{ locale === 'en' ? appStore.contact.shortDescription : appStore.contact.shortDescriptionFa }}
        </div>
        <!-- <div class="flex flex-col w-full">
          <button type="button" class="bg-teal-500 w-full flex-shrink-0 text-teal-100 capitalize  text-xl font-bold mt-20 mb-10 py-3 px-4 rounded-md">
            Place an order
          </button>
        </div> -->

        <strong class="text-lg py-4 inline-block mt-5 uppercase tracking-widest">
          {{ t('quickAccess') }}
        </strong>
        <ul class="w-full text-gray-500 flex flex-col gap-4 ">
          <li v-for="i in appStore.menuItems" :key="i.link" class="flex items-center gap-3">
            <NuxtLink :to="localePath('/contact')">
              {{ locale === 'en' ? i.en : i.fa }}
            </NuxtLink>
          </li>
        </ul>
        <strong class="text-lg py-4 inline-block mt-5 uppercase tracking-widest">
          {{ t('contactUs') }}
        </strong>
        <ul class="w-full text-gray-500 flex flex-col gap-4 ">
          <li class="flex items-center gap-3">
            <svg class="text-primary flex-shrink-0 w-5 h-5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8Z" /></g></svg>
            {{ locale === 'en' ? appStore.contact.address : appStore.contact.addressFa }}
          </li>
          <li class="flex items-center gap-3">
            <svg class="text-primary flex-shrink-0 w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" /></svg>
            {{ appStore.contact.email }}
          </li>
          <li class="flex items-center gap-3">
            <svg class="text-primary flex-shrink-0 w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="m20.487 17.14l-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66c-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z" /></svg>
            {{ appStore.contact.tel }}
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
