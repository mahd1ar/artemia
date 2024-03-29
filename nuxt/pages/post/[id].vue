<script setup lang="ts">
import { graphql } from '~/gql'

const route = useRoute()
const i18n = useI18n()

const Post = graphql(`
query PostFull($where: PostWhereUniqueInput!, $isEn: Boolean!) {
  post(where: $where) {
    id
    createdAt
    featuredImage {
      altText
      image {
        url
      }
    }
    en @include(if: $isEn) {
      title
      content {
        document
      }
      excerpt
    }
    fa @skip(if: $isEn) {
      title
      content {
        document
      }
      excerpt
    }
  }
}
`)

const lang = computed(() => i18n.locale.value === 'en' ? 'en' : 'fa')
const { result, loading } = useQuery(Post, { where: { id: route.params.id as string }, isEn: lang.value === 'en' })

const seo = computed(() => {
  const title = `${result.value?.post?.[lang.value]?.title || ''} | ${i18n.t('sitename')}`
  const description = `${result.value?.post?.[lang.value]?.excerpt || ''} | ${i18n.t('sitename')}`

  return {
    title, description
  }
})

useSeoMeta({
  title: () => seo.value.title,
  description: () => seo.value.description,
  ogTitle: () => seo.value.title,
  ogDescription: () => seo.value.description,
  ogImage: () => result.value?.post?.featuredImage?.image?.url,
  // ogUrl: '[og:url]',
  twitterTitle: seo.value.title,
  twitterDescription: seo.value.description,
  twitterImage: () => result.value?.post?.featuredImage?.image?.url,
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: lang.value
  }
  // link: [
  //   {
  //     rel: 'icon',
  //     type: 'image/png',
  //     href: '/favicon.png'
  //   }
  // ]
})

</script>
<template>
  <div class="p-2 ">
    <LoadingIndicator :is-loading="loading">
      <article
        class="max-w-2xl border px-6 py-24 mx-auto space-y-12 bg-gray-100 text-gray-800 "
      >
        <div class="w-full mx-auto space-y-4 text-center">
          <div class="flex justify-center items-center gap-4">
            <!-- <p
              v-for="tag in result?.post?.[lang].tags || []"
              :key="tag.id"
              class="text-xs font-semibold tracking-wider uppercase"
            >
              #{{ tag.name }}
            </p> -->
          </div>
          <h1 class="text-4xl font-bold leading-tight md:text-5xl">
            {{ result?.post?.[lang]?.title }}
          </h1>
          <p class="text-sm text-gray-400">
            <!-- by -->
            <!-- <a
            rel="noopener noreferrer"
            href="#"
            target="_blank"
            class="underline text-violet-400"
          > -->
            <!-- <span itemprop="name">Leroy Jenkins</span> </a -->
            <!-- > -->
            <time
              v-if="result?.post?.createdAt"
              datetime="2021-02-12 15:34:18-0200"
            >
              {{
                new Intl.DateTimeFormat('fa-IR', {
                  dateStyle: 'long'
                }).format(new Date(result?.post?.createdAt))
              }}
            </time>
          </p>
        </div>
        <img
          :src="result?.post?.featuredImage?.image?.url"
          :alt="result?.post?.featuredImage?.altText || ''"
          class="h-64 object-cover w-full"
        >
        <div class="text-gray-800">
          <ContentViewer :content="result?.post?.[lang]?.content?.document" />
        </div>
      </article>
    </LoadingIndicator>
    <div class="gap" />
  </div>
</template>
