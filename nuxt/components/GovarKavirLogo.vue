<script lang="ts" setup>
defineProps({
  dark: Boolean
})
</script>

<template>
  <div>
    <div
      class="uppercase p-4 py-3 inline-flex border-2 font-semibold text-xl"
      :class="[ dark ? 'border-white text-white' : 'border-black text-black' ]"
    >
      <div v-if="dark">
        GOvarKAvir Aria
      </div>
      <div v-else>
        GOvarKAvir Aria
      </div>
    </div>
  </div>
</template>

<style scoped></style>
