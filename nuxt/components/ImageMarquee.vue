<script lang="ts" setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'

defineProps({
  items: { type: Array as PropType<{src: string | null | undefined, alt: string | null | undefined }[]>, default: () => [] }
})

const device = useDevice()

</script>

<template>
  <div dir="ltr">
    <Splide

      :auto-scroll="{ speed: 1}"
      :options="{
        type : 'loop',
        drag : 'free',
        focus : 'center',
        arrows: false,
        perPage: device.isMobile?3: 6,
        gap: '30px',
        pagination: false
      }"
      :extensions="{AutoScroll}"
      aria-label="My Favorite Images"
    >
      <SplideSlide
        v-for="(i, inx) in items"
        :key="inx"
        class="rounded-xl flex-center grayscale-0 opacity-30 hover:opacity-60  md:scale-90"
      >
        <img
          class="w-full"
          :src="i.src || ''"
          :alt="i.alt || ''"
        >
      </SplideSlide>
    </Splide>
  </div>
</template>
