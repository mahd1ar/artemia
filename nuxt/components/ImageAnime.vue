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
const isOkToRun = ref(false)
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

const visibleAndLoaded = computed(() => {
  return targetIsVisible.value && isLoaded.value
})

watchOnce(visibleAndLoaded, () => {
  isOkToRun.value = true
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
    <div v-else class="w-full h-full flex-center text-cyan-400 animate-pulse tracking-widest bg-gray-50 rounded-lg font-bold">
      loading
    </div>
  </div>
</template>

<style scoped></style>
