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

const imgel = ref<HTMLImageElement | null>(null)
function loaded () {
  isLoaded.value = true
  emit('loaded', isLoaded)
}

onMounted(() => {
  if (imgel.value!.complete) {
    loaded()
  }
})
</script>

<template>
  <div

    :style="{
      minHeight : minHeight || 'unset',
      overflow: 'hidden',
      transform : `scale(${isLoaded ? 1 : 0.9})`,
      transition: 'all 0.5s ease-out',
      transitionDelay: `${delay}ms`,
    }"
  >
    <img
      v-if="src"
      ref="imgel"
      class="w-full h-full object-cover transition-all duration-1000 ease-in-out"
      :class="[isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-125 ']"
      loading="lazy"
      :src="src"
      :alt="alt"
      :style="{
        transitionDelay: `${delay}ms`,
      }"
      @load="loaded"
    >
    <!-- <div class="w-full h-full bg-black text-gray-400 font-bold">
      ?
    </div> -->
  </div>
</template>

<style scoped></style>
