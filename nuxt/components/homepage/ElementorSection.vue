<script lang="ts" setup>
import { vElementHover } from '@vueuse/components'

defineProps({
  list: Array as PropType<{
        src: string | null | undefined,
        title: string | null | undefined
    }[]>
})

const hoveredElementIndex = ref(0)

function hoverdElement (state: boolean, elementIndex: number) {
  if (state) { hoveredElementIndex.value = elementIndex }
}

const defaultImage = 'https://images.unsplash.com/photo-1683009427666-340595e57e43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
</script>

<template>
  <div class="h-[90vh] bg-black relative">
    <div class="overlay overflow-hidden">
      <TransitionGroup name="v">
        <img
          v-for="(li, index) in list || []"
          v-show="index === hoveredElementIndex"
          :key="index"
          class="h-full w-full object-cover"
          :src="li.src || defaultImage"
        >
      </TransitionGroup>
    </div>
    <div class="text-black h-full divide-gray-300 divide-x-[1px] relative w-full grid md:grid-cols-4 grid-cols-2">
      <div
        v-for="(i, index) in list"
        :key="index"
        v-element-hover="(el) => {
          hoverdElement(el, index);
        }
        "
        class="group relative transition-all duration-500 ease-out"
      >
        <div
          class="transition-all w-full absolute top-0 bg-white text-2xl flex-center z-10 font-bold duration-500 overflow-hidden ease-out h-0 group-hover:h-44"
        >
          <div class="flex-center  absolute top-0 h-44 w-full tracking-widest">
            <!-- SHALLOW DIVE -->
            {{ i.title }}
          </div>
        </div>

        <div class="bg-black/60 h-full group-hover:bg-black/70">
          <div
            class="transition-all w-full  absolute top-0 flex-center text-2xl tracking-widest font-bold text-white overflow-hidden h-44"
          >
            <AnimeInText :delay="index * 400" :duration="1000" :text="i.title" />
            <!-- SHALLOW DIVE -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transform: scale(1);
    transition: all 0.6s ease;
    position: absolute;
}

.v-enter-from,
.v-leave-to {
    transform: scale(1.1);
    opacity: 0;
}
</style>
