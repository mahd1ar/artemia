<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi'

// image: 'https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/partial-view-of-man-diving-in-ocean-alone-e1634536085170.jpg',

defineProps({
  title: { type: String, default: () => '' },
  description: { type: String, default: () => '' },
  items: {
    type: Array as PropType<
        {
            title: string | undefined | null,
        excerpt: string | undefined | null,
        image: string | undefined | null,
        tag: string | undefined | null
        }[]
        >,
    default: () => []
  }
})
</script>

<template>
  <section class="container">
    <h2 class="text-center text-3xl">
      {{ title || 'Latest Blogs and Articlas' }}
    </h2>
    <p class="px-48 text-center text-gray-500 mt-4 leading-7">
      {{ description }}
    </p>

    <div class="grid grid-cols-3 gap-4 mt-8">
      <div v-for="(i, idx) in items" :key="idx" class="flex flex-col">
        <div class="relative">
          <img v-if="i.image" :src="i.image " class="rounded-sm" alt="">
          <span
            class="inline-block bg-primary px-2 py-1 right-4 absolute top-4"
          >
            {{ i.tag }}
          </span>
        </div>
        <h4 class="text-xl font-bold text-center my-4">
          {{ i.title }}
        </h4>
        <p class="line-clamp-2 text-gray-600">
          {{ i.excerpt }}
        </p>

        <NuxtLink
          to="#"
          class="text-primary font-bold text-center text-sm my-4 tracking-widest opacity-75 uppercase"
        >
          REad more
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
