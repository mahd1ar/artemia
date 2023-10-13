<script lang="ts" setup>

defineProps({
  src: String,
  alt: String,
  minHeight: String,
  delay: {
    type: Number,
    default: () => 0
  }
})

const emit = defineEmits(['loaded'])
const isLoaded = ref(false)

const target = ref<HTMLImageElement | null>(null)
const imgel = ref<HTMLImageElement | null>(null)

const targetIsVisible = useElementVisibility(target)
function loaded () {
  isLoaded.value = true
  emit('loaded', isLoaded)
}

onMounted(() => {
  if (imgel.value!.complete) {
    loaded()
  }
})

const isOkToRun = computed(() => {
  return targetIsVisible.value && isLoaded.value
})

</script>

<template>
  <div
    ref="target"
    :style="{
      minHeight : minHeight || 'unset',
      overflow: 'hidden',
      transform : `scale(${isOkToRun ? 1 : 0.9})`,
      transition: 'all 0.5s ease-out',
      transitionDelay: `${delay}ms`,
    }"
  >
    <img
      v-if="src"
      ref="imgel"
      class="w-full h-full object-cover transition-all duration-1000 ease-in-out"
      :class="[isOkToRun ? 'opacity-100 scale-100' : 'opacity-0 scale-125 ']"
      loading="lazy"
      :src="src"
      :alt="alt"
      :style="{
        transitionDelay: `${delay}ms`,
      }"
      @load="loaded"
    >
    <div v-else class="w-full h-full flex-center text-cyan-500 font-bold">
      <svg class="w-10" viewBox="0 0 24 24"><circle cx="12" cy="3.5" r="1.5" fill="currentColor" opacity="0"><animateTransform
        attributeName="transform"
        calcMode="discrete"
        dur="2.4s"
        repeatCount="indefinite"
        type="rotate"
        values="0 12 12;90 12 12;180 12 12;270 12 12"
      /><animate attributeName="opacity" dur="0.6s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1;1;0" /></circle><circle cx="12" cy="3.5" r="1.5" fill="currentColor" opacity="0"><animateTransform
        attributeName="transform"
        begin="0.2s"
        calcMode="discrete"
        dur="2.4s"
        repeatCount="indefinite"
        type="rotate"
        values="30 12 12;120 12 12;210 12 12;300 12 12"
      /><animate
        attributeName="opacity"
        begin="0.2s"
        dur="0.6s"
        keyTimes="0;0.5;1"
        repeatCount="indefinite"
        values="1;1;0"
      /></circle><circle cx="12" cy="3.5" r="1.5" fill="currentColor" opacity="0"><animateTransform
        attributeName="transform"
        begin="0.4s"
        calcMode="discrete"
        dur="2.4s"
        repeatCount="indefinite"
        type="rotate"
        values="60 12 12;150 12 12;240 12 12;330 12 12"
      /><animate
        attributeName="opacity"
        begin="0.4s"
        dur="0.6s"
        keyTimes="0;0.5;1"
        repeatCount="indefinite"
        values="1;1;0"
      /></circle></svg>
    </div>
  </div>
</template>

<style scoped></style>
