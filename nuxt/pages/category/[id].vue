<script lang="ts" setup>
import { graphql } from '~/gql'

const localePath = useLocalePath()

const CATEGORY = graphql(`
query CategoryByID($id: ID!,$isEn: Boolean!) {
  category(where: {
    id: $id
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
        title
        excerpt
      }
      fa @skip(if: $isEn) {
        title
        excerpt
      }
    }
  }
}
`)

const { locale } = useI18n()
const route = useRoute()

if (!route.params.id) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

const lang = computed(() => {
  return locale.value === 'en' ? 'en' : 'fa'
})

const { result, loading } = useQuery(CATEGORY, {
  id: Array.isArray(route.params.id) ? route.params.id[0] : route.params.id,
  isEn: lang.value === 'en'
})

</script>

<template>
  <div>
    <LoadingIndicator :is-loading="loading">
      <div class="relative bg-gray-50 px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
        <div class="absolute inset-0">
          <div class="h-1/3 bg-white sm:h-2/3" />
        </div>
        <div class="relative mx-auto max-w-7xl">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              <!-- From the blog -->
              {{ result?.category?.[lang]?.title }}
            </h2>
            <p class="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              <!-- Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed. -->
              {{ result?.category?.[lang]?.content }}
            </p>
          </div>
          <LoadingIndicator v-if="loading" />
          <div v-else class="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            <div v-for="post in result?.category?.posts || []" :key="post.id" class="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div class="flex-shrink-0">
                <img
                  class="h-48 w-full object-cover "
                  :src="post.featuredImage?.image?.url"
                  alt=""
                >
              </div>

              <NuxtLink :to="localePath(`/post/${post.id}`)" class="flex flex-1 flex-col justify-between bg-white p-6">
                <div class="flex-1">
                  <p class="text-sm font-medium text-indigo-600">
                    <span class="hover:underline">
                      Article
                    </span>
                  </p>
                  <span class="mt-2 block">
                    <p class="text-xl font-semibold text-gray-900">
                      {{ post[lang]?.title }}
                    </p>
                    <p class="mt-3 text-base text-gray-500 line-clamp-5">
                      {{ post[lang]?.excerpt }}
                    </p>
                  </span>
                </div>
                <div class="mt-6 flex items-center">
                  <div class="flex-shrink-0">
                    <span>
                      <span class="sr-only">Roel Aufderehar</span>
                      <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                    </span>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900">
                      <span class="hover:underline">
                        Roel Aufderehar
                      </span>
                    </p>
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <time datetime="2020-03-16">Mar 16, 2020</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>6 min read</span>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </LoadingIndicator>
  </div>
</template>

<style scoped></style>
