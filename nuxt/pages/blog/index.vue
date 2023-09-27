<script lang="ts" setup>
// import { useRouteQuery } from '@vueuse/router'
import { graphql } from '~/gql'
const i18n = useI18n()
const localePath = useLocalePath()
const QUERY = graphql(`
  query Posts($where: PostWhereInput!, $isEnLang: Boolean!) {
  posts(where: $where) {
    id
    featuredImage {
      altText
      id
      image {
        id
        url
      }
    }
    createdAt
    en @include(if: $isEnLang) {
      title
      excerpt
    }
    fa @skip(if: $isEnLang) {
      title
      excerpt
    }
  }
}
`)
const lang = i18n.locale.value === 'en' ? 'en' : 'fa'

const { result } = useQuery(QUERY, {
  where: {
    category: {
      every: {
        slug: {
          equals: 'blog'
        }
      }
      // equals: 'blog'
    }
  },
  isEnLang: i18n.locale.value === 'en'
})

</script>

<template>
  <section class="bg-gray-100 text-gray-800">
    <div
      v-if="result?.posts"
      class="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12"
    >
      <nuxt-link
        :to="localePath(`/blog/${result.posts[0].id}`)"
        rel="noopener noreferrer"
        class="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-50  shadow-xl shadow-slate-300/50 rounded"
      >
        <img
          :src="result.posts[0].featuredImage?.image?.url"
          alt=""
          class="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-400"
        >
        <div class="p-6 space-y-2 lg:col-span-5">
          <h3
            class="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline"
          >
            {{ result.posts[0][lang]?.title }}
          </h3>
          <span class="text-xs text-gray-50">February 19, 2021</span>
          <p>{{ result.posts[0][lang]?.excerpt }}</p>
        </div>
      </nuxt-link>
      <div
        v-if="result.posts && result.posts.length > 1"
        class="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <template

          v-for="(blog, index) in result?.posts || []"
        >
          <nuxt-link
            v-if="index"
            :key="blog.id"
            rel="noopener noreferrer"
            :to="localePath(`/blog/${blog.id}`)"
            class="max-w-sm mx-auto group hover:no-underline focus:no-underline bg-gray-50 border "
          >
            <img
              loading="lazy"
              role="presentation"
              class="object-cover w-full rounded h-44 bg-gray-500"
              :src="blog.featuredImage?.image?.url"
            >
            <div class="p-6 space-y-2">
              <h3
                class="text-2xl font-semibold group-hover:underline group-focus:underline line-clamp-3"
              >
                {{ blog[lang]?.title }}
              </h3>
              <span v-if="blog.createdAt" class="text-xs text-gray-400 ">{{
                new Intl.DateTimeFormat('fa-IR', {
                  dateStyle: 'long'
                }).format(new Date(blog.createdAt))
              }}</span>
              <p class="line-clamp-3">
                {{ blog[lang]?.excerpt }}
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
