<script lang="ts" setup>
import { useIntervalFn } from '@vueuse/core'
import { graphql } from '@/gql'
// import { home } from '~/gql/graphql'

const { locale, t } = useI18n()

const lang = computed(() => locale.value === 'en' ? 'en' : 'fa')

const FRONPAGE = graphql(`
query HomePage( $isEn: Boolean!) {
  frontPage {
     hero_en @include(if: $isEn) {
      title
      content
    }
    hero_fa @skip(if: $isEn) {
      title
      content
    }
    heroImage {
      altText
      id
      image {
        id
        url
      }
    }
    consortiumImages {
      id
      image {
        id
        url
      }
    }
    consortiumIntro_en @include(if: $isEn) {
      title
      content
    }
    consortiumIntro_fa @skip(if: $isEn) {
      title
      content
    }
    consortiumCEOSignatureImage {
      id
      image {
        id
        url
      }
    }
    statusTitleAndDescription_fa @skip(if: $isEn) {
      title
      content
    }
    statusTitleAndDescription_en @include(if: $isEn) {
      title
      content
    }
    statistics {
      id
      title
      en @include(if: $isEn) {
        title
        content {
          document
        }
      }
      fa @skip(if: $isEn) {
        title
        content {
          document
        }
      }
      misc {
        id
        key
        value
      }
    }
    introVideo {
      file {
        url
      }
    }
    sites {
      posts {
        fa @skip(if: $isEn) {
          id
          title
          excerpt
        }
        en @include(if: $isEn){
          id
          title
          excerpt
        }
        featuredImage {
          id
          image {
            id
            url
          }
        }
      }
    }
    features {
      posts {
        fa @skip(if: $isEn) {
          id
          title
          excerpt
        }
        en @include(if: $isEn) {
          id
          title
          excerpt
        }
        featuredImage {
          id
          image {
            id
            url
          }
        }
      }
    }
    testimonial {
      posts {
        fa @skip(if: $isEn) {
          id
          title
          excerpt
        }
        en @include(if: $isEn) {
          id
          title
          excerpt
        }
        featuredImage {
          id
          image {
            id
            url
          }
        }
      }
    }
    logos {
      id
      altText
      image {
        url
      }
    }
    blogTitleAndDescription_en @include(if: $isEn) {
      title
      content
    }
    blogTitleAndDescription_fa @skip(if: $isEn) {
      title
      content
    }
    blog {
      posts {
        id
        featuredImage {
          id
          image {
            id
            url
          }
        }
        fa @skip(if: $isEn) {
          title
          excerpt
        }
        en @include(if: $isEn) {
          title
          excerpt
        }
      }
    }
  }
}`)

definePageMeta({
  layout: 'home'
})

const { result , loading  } = useQuery(FRONPAGE, { isEn: lang.value === 'en' }, { fetchPolicy: 'no-cache' })
const conCounter = ref(0)
const conImages = computed(() => {
  return result.value?.frontPage?.consortiumImages?.map(i => i.image?.url || '')
})

// const sampleImage = 'https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/elementor/thumbs/snorkeler-framed-by-the-struts-of-a-wreck-of-a-plane-on-the-seabed--e1634535769483-peqe3vatpg6pccrr5ok0rm50g1ys3ewfqyb1m7xaxk.jpg'

useIntervalFn(() => {
  if (conCounter.value + 1 < (conImages.value?.length || 0)) {
    conCounter.value++
  } else {
    conCounter.value = 0
  }
}, 5000)
</script>

<template>
  <!-- <div v-if="!loading" > -->


  <PageHeading
    :title="result?.frontPage?.[lang === 'en' ? 'hero_en' : 'hero_fa']?.title || '' "
    :description="result?.frontPage?.[lang === 'en' ? 'hero_en' : 'hero_fa']?.content || ''"

    :sections="[
      {
      href: '#consortium',
      title: result?.frontPage?.[lang === 'en' ? 'consortiumIntro_en' : 'consortiumIntro_fa']?.title || ''
    },
      // {
      //   href: '#features',
      //   title: result?.frontPage?.[lang === 'en' ? 'statusTitleAndDescription_en' : 'statusTitleAndDescription_fa']?.title || ''
      // },
    ]"
  />

  <section class="container mx-auto my-24 text-tm-black flex">
    <div class="w-5/12 relative">
      <div>
        <div class="relative    h-[463px] overflow-hidden w-full ">
          <div
            class="flex w-full h-full transition duration-700 delay-150"
            :style="{transform: 'translateX(-'+100 * conCounter+'%)'}"
          >
            <img
              v-for="(image,index) in conImages"
              :key="index"
              class="w-full h-full object-cover"
              :src="image"
              alt=""
            >
          </div>
        </div>
        <div class="absolute w-32 h-44 top-8 border-[12px] border-white overflow-hidden">
          <div
            v-if="conImages"
            class="flex h-full transition duration-700 "
            :style="{transform: 'translateX(-'+100 * conCounter+'%)'}"
          >
            <img

              v-for="(_,index) in conImages"
              :key="index"
              class="object-cover w-full h-full"
              :src="conImages[(index+2)%conImages?.length]"
              alt=""
            >
          </div>
        </div>
        <div class="absolute w-36 h-44 bottom-8 -right-8 border-[12px] border-white overflow-hidden">
          <div
            v-if="conImages"
            class="flex h-full transition duration-700 delay-300"
            :style="{transform: 'translateX(-'+100 * conCounter+'%)'}"
          >
            <img
              v-for="(_,index) in conImages"
              :key="index"
              class="object-cover w-full h-full"
              :src="conImages[(index+1)%conImages?.length]"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
    <div class="w-7/12 px-10 relative">
      <div class="relative h-full flex flex-col">
        <svg class="w-32 -translate-y-1/2 text-primary absolute" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z" />
        </svg>

        <h2 class="text-tm-black relative text-4xl font-extrabold text-center">
          {{ result?.frontPage?.[ lang === 'en' ? 'consortiumIntro_en' : 'consortiumIntro_fa']?.title || 'IRAN Artemia Consortium' }}
        </h2>
        <div class="text-center text-gray-400 mt-5 leading-7">
          {{
            result?.frontPage?.[ lang === 'en' ? 'consortiumIntro_en' : 'consortiumIntro_fa']?.content || 'lorem ipsom'
          }}
        </div>
        <div class="h-full w-full  flex flex-col justify-center items-center">
          <div class="w-full h-full flex-center p-6" aria-hidden="true">
            <div class="bg-primary w-0.5 rounded-sm h-full" />
          </div>
          <div class="flex flex-col items-center justify-center">
            <h2 class="font-bold text-xl uppercase">
              {{ t('frontPage:CEO') }}
            </h2>
            <p class="text-gray-400">
              {{ t('frontPage:CEOTitle') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="grid grid-cols-4 pb-24">
    <div v-for="i in 4" :key="i" class="hover:shadow-xl gap-2 ease-out hover:scale-90 p-6 transition-all">
      <div class="flex-center">
        <img
          class="w-14"
          src="https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/Asset-2@3x.png"
          alt=""
        >
      </div>
      <h3 class="font-bold pt-8 pb-3">
        RENTAL EQUIPMENT
      </h3>
      <span class="text-gray-500 text-sm">
        Lorem ipsum dolor sit amet, consecte adipiscin elit.
      </span>
    </div>
  </section>

  <section class="flex">
    <div class="p-14 w-5/12 text-gray-50 bg-gray-950 flex flex-col gap-4">
      <h2 class="text-4xl font-bold">
        <!-- WE WILL PAMPER YOUR EYES IN THE WATER -->
        {{ result?.frontPage?.[lang === 'en' ? 'statusTitleAndDescription_en' : 'statusTitleAndDescription_fa']?.title
        }}
      </h2>
      <span class="text-gray-400 text-sm leading-7 mb-5">
        {{ result?.frontPage?.[lang === 'en' ? 'statusTitleAndDescription_en' : 'statusTitleAndDescription_fa']?.content
        }}

      </span>
      <div class="grid grid-cols-2">
        <div v-for="i in result?.frontPage?.statistics || []" :key="i.id" class="flex flex-col">
          <PieChart :percentage="i.misc ? +i.misc : 42" />
          <h3 class="my-4 text-2xl font-bold">
            <!-- Dive Treavel -->
            {{ i[lang]?.title }}
          </h3>
          <div class="font-xs text-gray-400">
            <!-- {{ i[lang]?.content }} -->
            <ContentViewer v-if="i[lang]?.content?.document" :content="i[lang]?.content?.document" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-cyan-400 w-7/12 relative">
      <video
        v-if="result?.frontPage?.introVideo?.file?.url"
        class="absolute h-full w-full object-cover "
        autoplay
        muted
        loop
      >
        <source :src="result.frontPage.introVideo.file.url" type="video/mp4">
      </video>
      <div class="bg-gradient-to-r from-cyan-400 to-teal-500/50 mix-blend-multiply absolute top-0 left-0 w-full h-full" />
    </div>
  </section>

  <!-- <ElementorSection :list="result?.frontPages?.[0]?.sites?.map(i=>({src:i.featuredImage?.image?.url, title:i.title})) || []" class="mt-28" /> -->

  <!-- <h2>{{ result?.frontPages?.[0]?.featuresTitle }}</h2>
  <p>{{ result?.frontPages?.[0]?.featuresDescription }}</p> -->

  <PixelGrid
    :list="result?.frontPage?.features?.posts?.map(i => ({
      src: i.featuredImage?.image?.url, title: i?.[lang]?.title, description: i?.[lang]?.excerpt
    })) || []"
  />

  <TestimonialSection
    :items="result?.frontPage?.testimonial?.posts?.map(i => ({
      text: i?.[lang]?.title,
      autor: '#',
      image: i.featuredImage?.image?.url
    })) || []
    "
    class="mt-28"
  />

  <div class="grid grid-cols-6 gap-6 mt-28 container mx-auto">
    <div
      v-for="logo in result?.frontPage?.logos || []"
      :key="logo.id"
      class="grayscale-0 opacity-30 hover:opacity-60 transition-all duration-500 mx-6"
    >
      <img class="object-contain" :src="logo.image?.url" alt="">
    </div>
  </div>

  <LatestBlog
  v-if="(result?.frontPage?.blog?.posts?.length || 0) > 0"
    class="mt-28"
    :title="result?.frontPage?.[lang ? 'blogTitleAndDescription_en' : 'blogTitleAndDescription_fa']?.title || 'Latest Blogs and Articlas'"
    :description="result?.frontPage?.[lang ? 'blogTitleAndDescription_en' : 'blogTitleAndDescription_fa']?.content || '' "
    :items="result?.frontPage?.blog?.posts?.map( i => ({
      title: i?.[lang]?.title || '',
      excerpt: i?.[lang]?.excerpt || '',
      image: i.featuredImage?.image?.url || '',
      tag: 'blog'
    })||[])"
  />

  <SideNav />
  <!-- </div> -->
</template>

<style scoped>
.router-link-active {
  color: #00dacf;
  font-weight: 600;
}
</style>
