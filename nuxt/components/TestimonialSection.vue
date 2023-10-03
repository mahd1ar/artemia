<script lang="ts" setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'

defineProps({
  items: {
    type: Array as PropType<{
            text: string | null | undefined,
    autor: string | null | undefined,
    image: string | null | undefined
        }[]>,
    default: () => []
  },
  testemonialBackgroundImage: {
    type: String,
    default: () => ''
  }
})
</script>

<template>
  <section class="relative flex flec-col h-screen">
    <div class="overlay">
      <img
        :src="testemonialBackgroundImage || 'https://picsum.photos/951/701'"
        alt=""
        class="w-full h-full object-cover"
      >
    </div>
    <div class="relative container flex flex-col items-end justify-end">
      <div class="w-full">
        <Splide
          class="w-7/12 absolute bottom-4"
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
            class="bg-white w-full p-6 ring-1 rounded-sm"
          >
            <blockquote class="text-lg text-gray-700 relative">
              <span
                class="absolute w-32 h-32 right-0 bottom-0 opacity-10 text-gray-500"
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
              <p class="relative py-4">
                {{ i.text }}
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
                  {{ i.autor }}
                </p>
                <strong class="text-primary text-sm uppercase">manager</strong>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </section>
</template>
