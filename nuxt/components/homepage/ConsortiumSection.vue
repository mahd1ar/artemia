<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import { PropType } from 'nuxt/dist/app/compat/capi'

const { t } = useI18n()

const props = defineProps({
  title: { type: String, default: () => '' },
  content: { type: String, default: () => '' },
  conImages: { type: Array as PropType<string[]>, default: () => [] },
  signatureImage: { type: String, default: () => '' }
})

const conCounter = ref(0)

useIntervalFn(() => {
  if (conCounter.value + 1 < (props.conImages?.length || 0)) {
    conCounter.value++
  } else {
    conCounter.value = 0
  }
}, 5000)
</script>

<template>
  <section
    class="container mx-auto my-24 text-tm-black flex flex-col md:flex-row w-full items-center md:items-stretch"
  >
    <div dir="ltr" class="sm:w-1/2 flex-shrink-0 lg:w-5/12 relative">
      <div class="flex-center">
        <div class="relative frame_main overflow-hidden w-full">
          <div
            class="flex w-full h-full transition duration-700 delay-150"
            :style="{
              transform: 'translateX(-' + 100 * conCounter + '%)',
            }"
          >
            <img
              v-for="(image, index) in conImages"
              :key="index"
              class="w-full h-full object-cover shrink-0"
              :src="image"
              alt=""
            >
          </div>
        </div>
        <div
          class="absolute frame frame_1 border-white overflow-hidden"
        >
          <div
            v-if="conImages"
            class="flex h-full transition duration-700"
            :style="{
              transform: 'translateX(-' + 100 * conCounter + '%)',
            }"
          >
            <img
              v-for="(_, index) in conImages"
              :key="index"
              class="object-cover w-full h-full shrink-0"
              :src="conImages[(index + 2) % conImages?.length]"
              alt=""
            >
          </div>
        </div>
        <div
          class="absolute frame frame_2 border-white overflow-hidden"
        >
          <div
            v-if="conImages"
            class="flex h-full transition duration-700 delay-300"
            :style="{
              transform: 'translateX(-' + 100 * conCounter + '%)',
            }"
          >
            <img
              v-for="(_, index) in conImages"
              :key="index"
              class="object-cover w-full h-full shrink-0"
              :src="conImages[(index + 1) % conImages?.length]"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="md:w-1/2 flex-shrink-0 lg:w-7/12 px-10 relative mt-14 md:mt-0"
    >
      <div class="relative h-full flex flex-col">
        <svg class="qut text-primary absolute" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"
          />
        </svg>

        <h2
          class="text-tm-black relative text-4xl capitalize font-extrabold text-center"
        >
          {{ title }}
        </h2>
        <div class="text-center text-gray-400 mt-5 leading-7">
          {{ content }}
        </div>
        <div
          class="h-full w-full flex flex-col justify-center items-center"
        >
          <div
            class="w-full h-full flex-center p-6"
            aria-hidden="true"
          >
            <div class="bg-primary w-0.5 rounded-sm h-full" />
          </div>
          <div
            class="flex flex-col items-center justify-center relative"
          >
            <div class="absolute w-52 opacity-50 top-0">
              <img class="" :src="signatureImage" alt="">
            </div>
            <h2 class="font-bold text-xl uppercase">
              {{ t('frontPage:CEO') }}
            </h2>
            <p class="text-primary">
              {{ t('frontPage:CEOTitle') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.qut {
    @apply w-20 opacity-75 lg:w-32 -translate-y-1/2;
}

.frame {
    @apply w-40 h-48 border-[12px];
}
.frame_1 {
    @apply top-6 sm:-left-8 left-0;
}
.frame_2 {
    @apply bottom-6 sm:-right-8 right-0;
}

.frame_main {
    @apply h-[600px] w-9/12 md:w-full md:h-[463px];
}
</style>
