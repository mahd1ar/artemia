<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core'
defineProps({
  percentage: {
    type: [Number, String],
    default: () => 20,
    validator (value : string|number) {
      return !isNaN(+value)
    }
  },
  color: {
    type: String,
    default: () => '#00dacf'
  }
})

const target = ref(null)
const targetIsVisible = ref(false)

useIntersectionObserver(target, ([{ isIntersecting }], _) => {
  targetIsVisible.value = isIntersecting
})
</script>

<template>
  <div ref="target">
    <div
      class="text-5xl"
      :class="['pie', targetIsVisible && 'animate ']"
      :style="{ '--p': percentage, '--c': color }"
    >
      {{ percentage }}%
    </div>
  </div>
</template>

<style scoped lang="scss">
@property --p {
  syntax: '<number>';
  inherits: true;
  initial-value: 0;
}

.pie {
  --p: 20;
  --b: 4px;
  --c: darkred;
  --w: 150px;

  width: var(--w);
  aspect-ratio: 1;
  position: relative;
  display: inline-grid;
  margin: 5px;
  place-content: center;
  font-weight: bold;
  font-family: sans-serif;
}
.pie:before,
.pie:after {
  content: '';
  position: absolute;
  border-radius: 50%;
}
.pie:before {
  inset: 0;
  background:
    radial-gradient(farthest-side, var(--c) 98%, #0000) top/var(--b) var(--b)
      no-repeat,
    conic-gradient(var(--c) calc(var(--p) * 1%), #0000 0);

  mask: radial-gradient(
    farthest-side,
    #0000 calc(99% - var(--b)),
    #000 calc(100% - var(--b))
  );
}
.pie:after {
  inset: calc(50% - var(--b) / 2);
  background: var(--c);
  transform: rotate(calc(var(--p) * 3.6deg))
    translateY(calc(50% - var(--w) / 2));
}
.animate {
  animation: p 1s 0.5s both;
}

@keyframes p {
  from {
    --p: 0;
  }
}
</style>
