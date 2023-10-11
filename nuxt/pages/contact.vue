<script lang="ts" setup>
import { graphql } from '~/gql'

const CONTACT = graphql(`
query contactUs($isEn: Boolean!) {
  contactUs {
    aboutFa @skip(if: $isEn) {
      document
    }
    aboutUs @include(if: $isEn) {
      document
    }
    address
    addressFa
    bale
    email
    instagram
    lat
    long
    telegram
    whatsapp
  }
}`)

const i18n = useI18n()
const lang = computed(() => i18n.locale.value === 'en' ? 'en' : 'fa')
const { result, loading, load } = useLazyQuery(CONTACT, { isEn: lang.value === 'en' })

onMounted(() => {
  load()
})
const ismounted = useMounted()
</script>

<template>
  <LoadingIndicator v-if="loading" />
  <section v-else-if="ismounted" class="flex bg-gray-100 items-center py-20  xl:h-screen font-poppins  ">
    <div class="justify-center mt-6 flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-6 md:px-6">
      <div class="relative max-w-3xl gap-6 mx-auto flex">
        <div class="relative z-20 border-2 object-cover w-full rounded-2xl h-96 overflow-hidden ">
      
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6471.94316710709!2d51.48499475375823!3d35.80063093109602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sde!4v1696771920001!5m2!1sen!2sde"
              width="600"
              height="450"
              style="border:0;"
              :allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
        
        </div>

        <div class="absolute top-0 left-0 items-center justify-center hidden -ml-16 -mt-14 lg:inline-flex">
          <svg width="169" height="136" viewBox="0 0 169 136" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="49" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="49" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="121" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="121" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="121" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="121" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="121" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="121" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="121" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="121" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="121" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="121" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="73" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="145" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="145" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="145" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="145" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="145" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="145" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="145" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="145" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="145" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="145" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="29" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="50" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="71" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="92" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="25" cy="113" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="28" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="49" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="70" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="91" r="5" fill="#99BAFB" fill-opacity="0.32" />
            <circle cx="97" cy="112" r="5" fill="#99BAFB" fill-opacity="0.32" />
          </svg>
        </div>

        <div class="  mt-10 -mb-20 w-full ">
          <div
            class="w-full p-8 border shadow-sm  bg-gray-50   rounded-2xl"
          >
            <h2 class="mb-4 text-4xl font-bold text-gray-600 ">
              About Us
            </h2>
            <p class="pb-4 mb-4 text-gray-600  ">
              <ContentViewer
                :content="result?.contactUs?.[lang === 'en' ? 'aboutUs' :'aboutFa']?.document"
              />
            </p>
            <a
              href="#"
              class="px-4 py-3 text-sm text-gray-100 transition-all transform bg-blue-600 rounded-2xl hover:bg-blue-500 dark:hover:bg-blue-500 dark:hover:text-gray-50 dark:text-gray-100 hover:text-gray-100"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
