<script lang="ts" setup>
import { graphql } from '@/gql'

const FRONPAGE = graphql(`
query FrontPage($isEnLang: Boolean!, $lang: String!) {
  frontPages(where: {
    lang:{
      equals: $lang
    }
  }) {
    heroTitle
    heroDescription
    heroImage {
      altText
      id
      image {
        id
        url
      }
    }
    statusTitle
    statusDescription
    statistics {
      id
      title
      content
      misc
    }

    sites {
      title
      featuredImage {
        id
        altText
        image {
          url
        }
      }
    }
    featuresTitle
    featuresDescription
    features {
      title
      content
      featuredImage {
        altText
        id
        image {
          url

        }
      }
    }
    testimonial {
      title
      featuredImage {
        altText
        id
        image {
          id
          url
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
    BlogTitle
    BlogDescription

  }

  posts(where: { category: { equals: "blog" } }) {
    id
    title
    type
    featuredImage {
      image {
        url
      }
    }
    en @include(if: $isEnLang) {
      title
      content {
        document
      }
      tags {
        id
        name
      }
    }
    fa @skip(if: $isEnLang) {
      title
      content {
        document
      }
      tags {
        id
        name
      }
    }
  }
}
`)

definePageMeta({
  layout: 'home'
})

const { result } = useQuery(FRONPAGE, { isEnLang: true, lang: 'en' })

// onResult((res) => {
//   console.log(res.data.posts)
// })

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
        {{ result?.frontPages?.[0]?.statusTitle }}
      </h2>
      <span class="text-gray-400 text-sm leading-7 mb-5">
        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  enim ad minim veniam, quis nostrud exercitation ullamco laboris
  nisi ut aliquip ex ea commodo enim ad minim veniam, quis nostrud
  exercitation. -->
        {{ result?.frontPages?.[0]?.statusDescription }}
      </span>
      <div class="grid grid-cols-2">
        <div v-for="i in result?.frontPages?.[0]?.statistics || []" :key="i.id" class="flex flex-col">
          <PieChart :percentage="i.misc ? +i.misc : 42" />
          <h3 class="my-4 text-2xl font-bold">
            <!-- Dive Treavel -->
            {{ i.title }}
          </h3>
          <div class="font-xs text-gray-400">
            {{ i.content }}
            <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed vel ipsum auctor, iaculis arcu quis -->
          </div>
        </div>
      </div>
    </div>
    <div class="bg-cyan-400 w-7/12" />
  </section>

  <ElementorSection :list="result?.frontPages?.[0]?.sites?.map(i=>({src:i.featuredImage?.image?.url, title:i.title})) || []" class="mt-28" />

  <h2>{{ result?.frontPages?.[0]?.featuresTitle }}</h2>
  <p>{{ result?.frontPages?.[0]?.featuresDescription }}</p>
  <PixelGrid :list="result?.frontPages?.[0]?.features?.map(i => ({ src: i.featuredImage?.image?.url, title: i.title,description: i.content})) || []" />

  <TestimonialSection :items="result?.frontPages?.[0]?.testimonial?.map(i => ({autor: 'text',image: i.featuredImage?.image?.url,text: i.title})) " class="mt-28" />

  <div class="grid grid-cols-6 gap-6 mt-28 container mx-auto">
    <div v-for="logo in result?.frontPages?.[0]?.logos || []" :key="logo.id" class="grayscale-0 opacity-30 hover:opacity-60 transition-all duration-500 mx-6">
      <img
        class="object-contain"
        :src="logo.image?.url"
        alt=""
      >
    </div>
  </div>

  <!-- @vue-ignore -->
  <LatestBlog
    :title="result?.frontPages?.[0]?.BlogTitle"
    :description="result?.frontPages?.[0]?.BlogDescription"
    :items="result?.posts?.map( i => ({
      title: i.en?.title || i.fa?.title || '',
      excerpt: 'asdads',
      image: i.featuredImage?.image?.url || '',
      tag : i.en?.tags?.map( j => j.name).join(',') || i.fa?.tags?.map( j => j.name).join(',') || ''
    })) || []"
    class="mt-28"
  />
  <SideNav />
</template>

<style scoped>

.router-link-active {
  color: #00dacf ;
  font-weight: 600;
}
</style>
