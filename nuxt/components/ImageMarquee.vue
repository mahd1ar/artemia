<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'

defineProps({
  items: { type: Array as PropType<{src: string | null | undefined, alt: string | null | undefined }[]>, default: () => [] }
})

</script>
<!-- md:flex grid grid-cols-3 sm:grid-cols-6 gap-6 -->
<template>
  <div
    :style="{
      '--animation-duration' : 14
    }"
    class="flex flex-nowrap marquee "
  >
    <div v-for="j in 2" :key="j" class=" flex flex-nowrap justify-evenly w-full items-center">
      <div
        v-for="(i, index) in items.filter(Boolean) || []"
        :key="index"
        class="grayscale-0 opacity-30 hover:opacity-60 transition-all mx-5 w-28 md:w-28 lg:w-32 duration-500 "
      >
        <img class="object-contain w-full" :src="i.src || ''" :alt="i.alt || ''">
      </div>
    </div>
  </div>
</template>

<style scoped>

.marquee{
  width: fit-content;
  animation: marquee-anime 5000ms linear 0s infinite;
  animation-duration: calc(var( --animation-duration , 4) * 1000ms ) ;
}

@keyframes marquee-anime {
  0%{
    transform: translateX(-50%);
  }
  100%{
    transform: translateX(0%);
  }
}

</style>
