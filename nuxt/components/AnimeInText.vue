<script lang="ts" setup>

defineProps({
  component: {
    type: String as PropType< string | null | undefined>,
    default: () => 'div'
  },
  text: {
    type: String as PropType< string | null | undefined>,
    default: () => ''
  },
  delay: {
    type: Number as PropType<number | undefined | null>,
    default: () => 0
  },
  duration: {
    type: Number as PropType<number | undefined | null>,
    default: () => 600
  }
})
const target = ref(null)
const targetIsVisible = useElementVisibility(target)
// const x = ref(false)
</script>

<template>
  <component :is="component" ref="target" class=" overflow-hidden">
    <span
      class="text-inherit inline-block transition "
      :style="{
        'transition-duration' : duration + 'ms',
        'transition-timing-function' : 'cubic-bezier(0.83, 0, 0.17, 1)',
        'transition-delay' : delay + 'ms',
        'transition-property' : 'transform, opacity',
      }"
      :class="!targetIsVisible ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100' "
    >
      {{ text }}
    </span>
    <!-- <b class="fixed top-0 rigth-0" @click="x = !x">Click</b> -->
  </component>
</template>

<style scoped></style>
