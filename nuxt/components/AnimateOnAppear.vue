<script lang="ts" setup>

const target = ref(null)

const isVisible = ref(false)

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    isVisible.value = isIntersecting
  }
)

</script>

<template>
  <div  :data-animation="isVisible" class="w-full overflow-hidden" >
    <div ref="target" class="transition-all duration-500 " :class="[isVisible ? 'target-visible' : 'target-not-visible' ]">

      <slot  
       />
    </div>
  </div>
</template>

<style scoped lang="scss">

.target-visible{
  @apply scale-100 opacity-100;
}

.target-not-visible{
  @apply scale-125 opacity-0;
}
</style>
