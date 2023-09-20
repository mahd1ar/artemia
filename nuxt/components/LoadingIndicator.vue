<script lang="ts" setup>

defineProps({
  isLoading: Boolean
})

</script>

<template>
  <div>
    <div v-if="isLoading" class="w-full h-80 flex-center">
      <div class="custom-loader" />
    </div>

    <slot v-else />
  </div>
</template>

<style scoped>
.custom-loader {
  width:50px;
  height:50px;
  --c:radial-gradient(farthest-side,#00c2a6 92%,#0000);
  background:
    var(--c) 50% 0,
    var(--c) 50% 100%,
    var(--c) 100% 50%,
    var(--c) 0    50%;
  background-size:12px 12px;
  background-repeat:no-repeat;
  animation:s7 1s infinite;
}
@keyframes s7 {to{transform: rotate(.5turn)}}

</style>
