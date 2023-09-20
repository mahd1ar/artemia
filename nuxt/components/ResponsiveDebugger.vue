<script lang="ts" setup></script>

<template>
  <DevOnly>
    <div
      ref="target"
      :style="`
          position: fixed;
          top: 200px;
          left: 20px;
          width : 164px;
          background: white;
          direction: ltr;
          z-index : 200;
          opacity: 0.8;
          `"
    >
      <div @click="$refs.target?.remove()">
        x close
      </div>

      <div style="background-color: red" class="text-xs text-white">
        this will not show in production
      </div>

      <br>
      <div
        class="top-10 left-10 z-50 opacity-50 sm:bg-green-400 md:bg-red-500 lg:bg-blue-500 xl:bg-yellow-500"
      >
        <span class="hidden sm:block">sm</span>
        <span class="hidden md:block">md</span>
        <span class="hidden lg:block">lg</span>
        <span class="hidden xl:block">xl</span>
        <span class="hidden 2xl:block">2xl</span>
      </div>
    </div>
  </DevOnly>
</template>
