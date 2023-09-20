<script lang="ts" setup>
import { graphql } from '@/gql'
import { useAppState } from '@/stores/appState'

const appStore = useAppState()
const { setLocale } = useI18n()

definePageMeta({
  layout: 'home'
})

const FRONPAGE = graphql(`

query FrontPage($isEnLang: Boolean!) {
  frontPage {
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
  contactUs {
    email
    address
    addressFa
    instagram
    telegram
    whatsapp
    tel
  }
}
`)

const { result, onResult } = useQuery(FRONPAGE, { isEnLang: true })

// onResult((res) => {
//   console.log(res.data.posts)
// })

function openNav () {
  appStore.toggleMenu(true)
}

function chengeLang (newLang : string) {
  setLocale(newLang)
}

</script>

<template>
  <section class="text-white relative h-[80vh] overflow-hidden flex flex-col">
    <div class="absolute w-full h-full">
      <img
        class="h-full object-cover w-full"
        src="https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/freediving-e1633923358732.jpg"
        alt=""
      >
      <div aria-hidden="true" style="background-color: #03062a; opacity: 0.7" class="overlay" />
    </div>

    <div class="relative h-max container mx-auto flex justify-between border-b border-white/50">
      <div class="flex gap-4 text-sm py-4">
        <div class="flex gap-2">
          <!-- location -->
          <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m18.157 16.882l-1.187 1.174c-.875.858-2.01 1.962-3.406 3.312a2.25 2.25 0 0 1-3.128 0l-3.491-3.396c-.44-.431-.806-.794-1.102-1.09a8.707 8.707 0 1 1 12.314 0ZM14.5 11a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"
            />
          </svg>
          {{ result?.contactUs?.address }}
        </div>
        <div class="flex gap-2">
          <!-- mail icon -->
          <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44z"
            />
          </svg>

          {{ result?.contactUs?.email }}
        </div>
      </div>
      <div class="flex items-center gap-4">
        <a :href="result?.contactUs?.instagram || '#'" target="_blank" title="instagram">
          <span class="sr-only">instagram</span>
          <svg class="w-5" viewBox="0 0 16 16"><path fill="currentColor" d="M8 5.67C6.71 5.67 5.67 6.72 5.67 8S6.72 10.33 8 10.33S10.33 9.28 10.33 8S9.28 5.67 8 5.67ZM15 8c0-.97 0-1.92-.05-2.89c-.05-1.12-.31-2.12-1.13-2.93c-.82-.82-1.81-1.08-2.93-1.13C9.92 1 8.97 1 8 1s-1.92 0-2.89.05c-1.12.05-2.12.31-2.93 1.13C1.36 3 1.1 3.99 1.05 5.11C1 6.08 1 7.03 1 8s0 1.92.05 2.89c.05 1.12.31 2.12 1.13 2.93c.82.82 1.81 1.08 2.93 1.13C6.08 15 7.03 15 8 15s1.92 0 2.89-.05c1.12-.05 2.12-.31 2.93-1.13c.82-.82 1.08-1.81 1.13-2.93c.06-.96.05-1.92.05-2.89Zm-7 3.59c-1.99 0-3.59-1.6-3.59-3.59S6.01 4.41 8 4.41s3.59 1.6 3.59 3.59s-1.6 3.59-3.59 3.59Zm3.74-6.49c-.46 0-.84-.37-.84-.84s.37-.84.84-.84s.84.37.84.84a.8.8 0 0 1-.24.59a.8.8 0 0 1-.59.24Z" /></svg>
        </a>
        <a :href="result?.contactUs?.telegram || '#'" target="_blank" title="telegram">
          <span class="sr-only">telegram</span>
          <svg class="w-5" viewBox="0 0 512 512"><path fill="currentColor" d="M470.435 45.423L16.827 221.249c-18.254 8.188-24.428 24.585-4.412 33.484l116.37 37.173l281.368-174.79c15.363-10.973 31.091-8.047 17.557 4.024L186.053 341.075l-7.591 93.076c7.031 14.371 19.905 14.438 28.117 7.295l66.858-63.589l114.505 86.187c26.595 15.826 41.066 5.613 46.788-23.394l75.105-357.47c7.798-35.705-5.5-51.437-39.4-37.757z" /></svg>
        </a>
        <a :href="result?.contactUs?.whatsapp || '#'" target="_blank" title="Whatsapp">
          <span class="sr-only">Whatsapp</span>
          <svg class="w-5" viewBox="0 0 16 16"><path fill="currentColor" d="M13.95 4.24C11.86 1 7.58.04 4.27 2.05C1.04 4.06 0 8.44 2.09 11.67l.17.26l-.7 2.62l2.62-.7l.26.17c1.13.61 2.36.96 3.58.96c1.31 0 2.62-.35 3.75-1.05c3.23-2.1 4.19-6.39 2.18-9.71Zm-1.83 6.74c-.35.52-.79.87-1.4.96c-.35 0-.79.17-2.53-.52c-1.48-.7-2.71-1.84-3.58-3.15c-.52-.61-.79-1.4-.87-2.19c0-.7.26-1.31.7-1.75c.17-.17.35-.26.52-.26h.44c.17 0 .35 0 .44.35c.17.44.61 1.49.61 1.58c.09.09.05.76-.35 1.14c-.22.25-.26.26-.17.44c.35.52.79 1.05 1.22 1.49c.52.44 1.05.79 1.66 1.05c.17.09.35.09.44-.09c.09-.17.52-.61.7-.79c.17-.17.26-.17.44-.09l1.4.7c.17.09.35.17.44.26c.09.26.09.61-.09.87Z" /></svg>
        </a>
      </div>
    </div>

    <div class="relative h-full container mx-auto flex flex-col">
      <div class="flex shrink-0 justify-between items-center">
        <div class="p-2 py-1 text-3xl border-2 my-2">
          lorem
        </div>
        <div class="flex gap-4 ">
          <div class="tracking-widest flex items-center gap-2">
            <strong @click="chengeLang('fa')">FA</strong>
            <strong @click="chengeLang('en')">EN</strong>
          </div>

          <div @click="openNav">
            <svg class="w-10" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 17h7M5 12h14M5 7h14"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="h-full flex-center justify-between w-full">
        <div class="w-1/3">
          <ol class="flex items-start gap-5 flex-col capitalize">
            <li class="pb-1 pr-2 border-primary border-b-2">
              Section 1
            </li>
            <li class="pb-1 pr-2 border-primary border-b-2">
              section 2
            </li>
            <li class="pb-1 pr-2 border-primary border-b-2">
              section 3
            </li>
            <li class="pb-1 pr-2 border-primary border-b-2">
              section 4
            </li>
          </ol>
        </div>
        <div class="text-right w-2/3">
          <h1 class="text-5xl font-bold">
            IRAN ARTEMIA
          </h1>
          <div class="text-gray-200 mt-10 italic font-bold">
            Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Aliquam tenetur deserunt, neque vitae dolorum
            fugiat mollitia expedita cupiditate, blanditiis
            provident inventore necessitatibus voluptatibus rerum a
            libero quod impedit, modi reiciendis!
          </div>
        </div>
      </div>
    </div>
  </section>

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
        {{ result?.frontPage?.statusTitle }}
      </h2>
      <span class="text-gray-400 text-sm leading-7 mb-5">
        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  enim ad minim veniam, quis nostrud exercitation ullamco laboris
  nisi ut aliquip ex ea commodo enim ad minim veniam, quis nostrud
  exercitation. -->
        {{ result?.frontPage?.statusDescription }}
      </span>
      <div class="grid grid-cols-2">
        <div v-for="i in result?.frontPage?.statistics || []" :key="i.id" class="flex flex-col">
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

  <ElementorSection :list="result?.frontPage?.sites?.map(i=>({src:i.featuredImage?.image?.url, title:i.title})) || []" class="mt-28" />

  <h2>{{ result?.frontPage?.featuresTitle }}</h2>
  <p>{{ result?.frontPage?.featuresDescription }}</p>
  <PixelGrid :list="result?.frontPage?.features?.map(i => ({ src: i.featuredImage?.image?.url, title: i.title,description: i.content})) || []" />

  <TestimonialSection :items="result?.frontPage?.testimonial?.map(i => ({autor: 'text',image: i.featuredImage?.image?.url,text: i.title})) " class="mt-28" />

  <div class="grid grid-cols-6 gap-6 mt-28 container mx-auto">
    <div v-for="logo in result?.frontPage?.logos || []" :key="logo.id" class="grayscale-0 opacity-30 hover:opacity-60 transition-all duration-500 mx-6">
      <img
        class="object-contain"
        :src="logo.image?.url"
        alt=""
      >
    </div>
  </div>

  <!-- @vue-ignore -->
  <LatestBlog
    :title="result?.frontPage?.BlogTitle"
    :description="result?.frontPage?.BlogDescription"
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

<style scoped></style>
