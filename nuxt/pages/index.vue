<script lang="ts" setup>
import { graphql } from '@/gql'
// import { home } from '~/gql/graphql'

const { locale } = useI18n()
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

const { result } = useQuery(FRONPAGE, { isEn: lang.value === 'en' }, { fetchPolicy: 'no-cache' })

</script>

<template>
  <PageHeading />
  <section class="container mx-auto my-24 text-tm-black flex">
    <div class="w-5/12 relative">
      <div>
        <img
          class="px-8 object-cover"
          src="https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/elementor/thumbs/snorkeler-framed-by-the-struts-of-a-wreck-of-a-plane-on-the-seabed--e1634535769483-peqe3vatpg6pccrr5ok0rm50g1ys3ewfqyb1m7xaxk.jpg"
          alt=""
        >
        <div class="absolute w-32 top-8 border-[12px] border-white">
          <img
            class="object-cover"
            src="https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/elementor/thumbs/snorkeler-framed-by-the-struts-of-a-wreck-of-a-plane-on-the-seabed--e1634535769483-peqe3vatpg6pccrr5ok0rm50g1ys3ewfqyb1m7xaxk.jpg"
            alt=""
          >
        </div>
        <div class="absolute w-36 bottom-8 -right-8 border-[12px] border-white">
          <img
            class="object-cover"
            src="https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/elementor/thumbs/snorkeler-framed-by-the-struts-of-a-wreck-of-a-plane-on-the-seabed--e1634535769483-peqe3vatpg6pccrr5ok0rm50g1ys3ewfqyb1m7xaxk.jpg"
            alt=""
          >
        </div>
      </div>
    </div>
    <div class="w-7/12 px-10 relative">
      <div class="relative">
        <svg v-show="false" class="w-14 -translate-y-1/2 text-primary absolute" viewBox="0 0 32 32">
          <g fill="currentColor">
            <path
              d="M17.978 7.993a1.978 1.978 0 1 1-3.956 0a1.978 1.978 0 0 1 3.956 0Zm-2.118 3.975c.967 0 1.75.783 1.75 1.75v10.59a1.75 1.75 0 1 1-3.5 0v-10.59c0-.967.784-1.75 1.75-1.75Z"
            />
            <path
              d="M6 1a5 5 0 0 0-5 5v20a5 5 0 0 0 5 5h20a5 5 0 0 0 5-5V6a5 5 0 0 0-5-5H6ZM3 6a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z"
            />
          </g>
        </svg>

        <svg class="w-14 -translate-y-1/2 absolute" viewBox="0 0 24 24" fill="none">
          <path
            opacity="0.5"
            d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
            stroke="#00dacf"
            stroke-width="1.5"
          />
          <path
            d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
            stroke="#1C274C"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <circle cx="12" cy="16" r="1" fill="#1C274C" />
        </svg>
      </div>
      <h2 class="text-tm-black relative text-4xl font-extrabold text-center">
        WHAT IS ARTEMIA
      </h2>
      <div class="text-center text-gray-400 mt-5 leading-7">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Delectus neque perspiciatis optio itaque nihil iste asperiores
        placeat voluptatibus enim necessitatibus odio consequuntur,
        maxime laboriosam eos numquam earum corrupti, sint quo.
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
  class="mt-28"
    :title="result?.frontPage?.[lang ? 'blogTitleAndDescription_en' : 'blogTitleAndDescription_fa']?.title || 'Latest Blogs and Articlas'"
    :description="result?.frontPage?.[lang ? 'blogTitleAndDescription_en' : 'blogTitleAndDescription_fa']?.content || '' "
    :items="result?.frontPage?.blog?.posts?.map( i => ({
      title: i?.[lang]?.title || '',
      excerpt: i?.[lang]?.excerpt || '',
      image: i.featuredImage?.image?.url || '',
      tag: 'blog'
    }))"
  />

  <SideNav />
</template>

<style scoped>
.router-link-active {
  color: #00dacf;
  font-weight: 600;
}
</style>
