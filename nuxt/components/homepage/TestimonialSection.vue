<script lang="ts" setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'

defineProps({
  items: {
    type: Array as PropType<{
    name: string | null | undefined,
    image: string | null | undefined,
    quote : string | null | undefined,
    post: string | null | undefined,
        }[]>,
    default: () => []
  },
  testemonialBackgroundImage: {
    type: String,
    default: () => ''
  }
})

const backgroundImage = ref<HTMLImageElement | null>(null)

</script>

<template>
  <section class="relative flex h-[600px] border-y-2">
    <div class="overlay">
      <img
        ref="backgroundImage"
        :src="testemonialBackgroundImage || 'https://picsum.photos/951/701'"
        alt=""
        class="w-full h-full object-cover "
      >
    </div>
    <div class="relative container flex flex-col items-end justify-end">
      <div class="w-full">
        <Splide
          class="lg:w-7/12  absolute bottom-4"
          :options="{
            rewind: true,
            gap: '1rem',
            autoplay: true,
            classes: {
              arrows: 'hidden',
              arrow: 'hidden',
            },
          }"
        >
          <SplideSlide
            v-for="(i, idx) in items"
            :key="idx"
            class="splider-bg w-full p-6 ring-1 rounded-sm"
          >
            <blockquote class="text-lg text-gray-700 relative">
              <span
                class="absolute w-32 h-32 right-0 text-primary bottom-0 opacity-20 "
              >
                <svg class="w-full h-full" viewBox="0 0 16 16">
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M6.25 3.75h-4.5v5.5c0 3.5 2.5 4.5 4.5 4c-1.5-1.5-1.5-2.5-1.5-4h1.5zm7 0h-4.5v5.5c0 3.5 2.5 4.5 4.5 4c-1.5-1.5-1.5-2.5-1.5-4h1.5z"
                  />
                </svg>
              </span>
              <p class="relative py-4 font-light">
                {{ i.quote }}
              </p>
            </blockquote>
            <div class="overflow-hidden mt-4 flex">
              <img
                v-if="i.image"
                :src="i.image"
                class="w-14 h-14 rounded-full"
                alt=""
              >
              <div class="px-4">
                <p class="text-lg">
                  {{ i.name }}
                </p>
                <strong class="text-primary text-sm uppercase">{{ i.post }}</strong>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.splider-bg {
  @apply bg-gradient-to-l from-white to-white/60 lg:bg-white backdrop-blur;
}

</style>
