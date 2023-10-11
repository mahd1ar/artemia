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
    <p class="px-10 max-w-3xl mx-auto text-center text-gray-500 mt-4 leading-7">
      {{ description }}
    </p>

    <div class="grid grid-cols-3 gap-4 mt-8">
      <div v-for="(i, idx) in items" :key="idx" class="flex flex-col">
        <div class="relative">
          <img v-if="i.image" :src="i.image " class="rounded-md shadow object-center h-44 object-cover w-full" alt="">
          <div v-else class="h-40 bg-gray-100 flex-center">
            <svg class="w-14 text-primary" viewBox="0 0 1024 1024"><path fill="currentColor" d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 632H136v-39.9l138.5-164.3l150.1 178L658.1 489L888 761.6V792zm0-129.8L664.2 396.8c-3.2-3.8-9-3.8-12.2 0L424.6 666.4l-144-170.7c-3.2-3.8-9-3.8-12.2 0L136 652.7V232h752v430.2z" /><path fill="currentColor" fill-opacity=".15" d="m424.6 765.8l-150.1-178L136 752.1V792h752v-30.4L658.1 489z" /><path fill="currentColor" fill-opacity=".15" d="m136 652.7l132.4-157c3.2-3.8 9-3.8 12.2 0l144 170.7L652 396.8c3.2-3.8 9-3.8 12.2 0L888 662.2V232H136v420.7zM304 280a88 88 0 1 1 0 176a88 88 0 0 1 0-176z" /><path fill="currentColor" fill-opacity=".15" d="M276 368a28 28 0 1 0 56 0a28 28 0 1 0-56 0z" /><path fill="currentColor" d="M304 456a88 88 0 1 0 0-176a88 88 0 0 0 0 176zm0-116c15.5 0 28 12.5 28 28s-12.5 28-28 28s-28-12.5-28-28s12.5-28 28-28z" /></svg>
          </div>
          <span
            class="inline-block font-bold  bg-primary px-2 py-1 right-4 absolute top-4"
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
