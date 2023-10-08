<script lang="ts" setup>
// import { useRouteQuery } from '@vueuse/router'
import { graphql } from '~/gql'
const { locale } = useI18n()
const localePath = useLocalePath()
const QUERY = graphql(`
query Blogs($isEn: Boolean!) {
  categories (where: {
    slug: {equals: "blog"}
  }) {
    id
    slug
    en @include(if: $isEn){
      content
      title
    }
    fa @skip(if: $isEn) {
      content
      title
    }
    posts {
      id
      featuredImage {
        image {
          url
        }
      }
      en @include(if: $isEn){
        id
        title
        excerpt
      }
      fa @skip(if: $isEn) {
        id
        title
        excerpt
      }
      createdAt
    }
  }
}
`)
const lang = computed(() => locale.value === 'en' ? 'en' : 'fa')

const { result, onResult } = useQuery(QUERY, {
  slug: 'blog',
  isEn: lang.value === 'en'
})

const posts = computed(() => {
  return (result.value?.categories && result.value.categories.length > 0)
    ? result.value.categories[0].posts?.map((p) => {
      return {
        id: p.id,
        imageUrl: p.featuredImage?.image?.url || '',
        title: p[lang.value]?.title || '',
        excerpt: p[lang.value]?.excerpt || '',
        createdAt: p.createdAt || new Date()
      }
    }) || []
    : []
})

</script>

<template>
  <section class="bg-gray-100 text-gray-800">
    <div
      v-if="posts.length > 0"
      class="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12"
    >
      <nuxt-link
        :to="localePath(`/post/${posts[0].id }`)"
        rel="noopener noreferrer"
        class="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-50  shadow-xl shadow-slate-300/50 rounded"
      >
        <img
          :src=" posts[0]?.imageUrl"
          alt=""
          class="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-400"
        >
        <div class="p-6 space-y-2 lg:col-span-5">
          <h3
            class="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline"
          >
            {{ posts[0].title }}
          </h3>
          <span class="text-xs text-gray-50">February 19, 2021</span>
          <p>{{ posts[0].excerpt }}</p>
        </div>
      </nuxt-link>
      <div
        class="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <template

          v-for="(blog, index) in posts || []"
        >
          <nuxt-link
            v-if="index"
            :key="blog.id"
            rel="noopener noreferrer"
            :to="localePath(`/post/${blog.id}`)"
            class="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50 border "
          >
            <img
              loading="lazy"
              role="presentation"
              class="object-cover w-full rounded h-44 bg-gray-500"
              :src="blog.imageUrl"
            >
            <div class="p-6 space-y-2">
              <h3
                class="text-2xl font-semibold group-hover:underline group-focus:underline line-clamp-3"
              >
                {{ blog.title }}
              </h3>
              <span v-if="blog.createdAt" class="text-xs text-gray-400 ">{{
                new Intl.DateTimeFormat('fa-IR', {
                  dateStyle: 'long'
                }).format(new Date(blog.createdAt))
              }}</span>
              <p class="line-clamp-3">
                {{ blog.excerpt }}
              </p>
            </div>
          </nuxt-link>
        </template>
      </div>
      <div v-show="false" class="flex justify-center">
        <button
          type="button"
          class="px-6 py-3 text-sm rounded-md hover:underline bg-gray-50 text-gray-400"
        >
          Load more posts...
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
