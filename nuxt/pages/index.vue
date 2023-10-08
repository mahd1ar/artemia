<script lang="ts" setup>
import { graphql } from '@/gql'
// import { home } from '~/gql/graphql'

const { locale, t } = useI18n()

const lang = computed(() => locale.value === 'en' ? 'en' : 'fa')

const FRONPAGE = graphql(`
query HomePage( $isEn: Boolean!) {
  frontPage {
     meta_en @include(if: $isEn) {
      title
      content
    }
    meta_fa @skip(if: $isEn) {
      title
      content
    }
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
    introVideoTitle_en @include(if: $isEn) {
      title
      content
    }
    introVideoTitle_fa @skip(if: $isEn) {
      title
      content
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
        misc {
          key
          value
        }
      }
    }
    testimonial_bg_image {
      id
      altText
      image {
        url
        id
        url
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
}
`)

definePageMeta({
  layout: 'home'
})

const { result, loading } = useQuery(FRONPAGE, { isEn: lang.value === 'en' })

// const sampleImage = 'https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/elementor/thumbs/snorkeler-framed-by-the-struts-of-a-wreck-of-a-plane-on-the-seabed--e1634535769483-peqe3vatpg6pccrr5ok0rm50g1ys3ewfqyb1m7xaxk.jpg'

</script>

<template>
  <Head>
    <Title>{{ result?.frontPage?.[lang === 'en' ? 'meta_en' : 'meta_fa']?.title }} | {{ t('sitename') }} </Title>
    <Meta name="description" :content="result?.frontPage?.[lang === 'en' ? 'meta_en' : 'meta_fa']?.content || '' " />
    <Meta property="og:locale" :content="locale" />
  </Head>

  <SideNav />

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
    :hero-background-image="result?.frontPage?.heroImage?.image?.url || ''"
  />

  <ConsortiumSection
    :title="result?.frontPage?.[ lang === 'en' ? 'consortiumIntro_en' : 'consortiumIntro_fa']?.title || 'IRAN Artemia Consortium' "
    :content=" result?.frontPage?.[ lang === 'en' ? 'consortiumIntro_en' : 'consortiumIntro_fa']?.content || 'lorem ipsom'"
    :con-images=" result?.frontPage?.consortiumImages?.map(i => i.image?.url || '')"
    :signature-image="result?.frontPage?.consortiumCEOSignatureImage?.image?.url"
  />

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

  <section class="flex flex-col md:flex-row">
    <div class="p-14 md:w-5/12 text-gray-50  flex flex-col gap-4 bg-tm-black">
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
          <PieChart :percentage="i.misc?.find(i => i.key?.toLowerCase() === 'percentage')?.value || 0" />
          <h3 class="my-4 text-2xl font-bold capitalize">
            <!-- Dive Treavel -->
            {{ i[lang]?.title }}
          </h3>
          <div class="text-sm text-gray-400 ltr:pl-2 ltr:pr-2">
            <!-- {{ i[lang]?.content }} -->
            <ContentViewer v-if="i[lang]?.content?.document" :content="i[lang]?.content?.document" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-cyan-400 md:w-7/12 relative h-[500px] md:h-auto">
      <video
        v-if="result?.frontPage?.introVideo?.file?.url"
        class="absolute h-full w-full object-cover "
        autoplay
        muted
        loop
      >
        <source :src="result.frontPage.introVideo.file.url" type="video/mp4">
      </video>
      <div class="bg-gradient-to-r from-cyan-400 to-teal-500/50  mix-blend-multiply absolute top-0 left-0 w-full h-full" />
      <div class=" absolute bottom-10 ltr:border-r-4 rtl:border-r-4 border-cyan-500 right-10 bg-tm-black  p-3 py-4">
        <h2 class="font-semibold text-2xl text-white">
          {{ result?.frontPage?.[lang === 'en' ? 'introVideoTitle_en' : 'introVideoTitle_fa']?.title }}
        </h2>
        <span class="text-gray-400">{{ result?.frontPage?.[lang === 'en' ? 'introVideoTitle_en' : 'introVideoTitle_fa']?.content }}</span>
      </div>
    </div>
  </section>

  <ElementorSection

    :list="result?.frontPage?.sites?.posts?.map(i=>(
      {
        src:i.featuredImage?.image?.url,
        title:i[lang]?.title
      })) || []"
    class="mt-28"
  />
  <h1 class="text-black font-bold mt-20 mb-12 uppercase text-center text-4xl">
    {{ t("ourproducts") }}
  </h1>
  <PixelGrid

    :list="result?.frontPage?.features?.posts?.map(i => ({
      src: i.featuredImage?.image?.url, title: i?.[lang]?.title, description: i?.[lang]?.excerpt
    })) || []"
  />

  <TestimonialSection
    v-if="(result?.frontPage?.testimonial?.posts?.length || 0) > 0"

    :items="result?.frontPage?.testimonial?.posts?.map(i => ({
      quote: i[lang]?.excerpt ,
      name: i?.[lang]?.title,
      image: i.featuredImage?.image?.url,
      post: i.misc?.find(i => i.key?.toLowerCase() === 'rank_'+ lang)?.value
    })) || []
    "
    :testemonial-background-image="result?.frontPage?.testimonial_bg_image?.image?.url"
    class="mt-28"
  />

  <div class="md:flex mt-28 justify-evenly w-full items-center grid grid-cols-3 sm:grid-cols-6 gap-6">
    <div
      v-for="logo in result?.frontPage?.logos || []"
      :key="logo.id"
      class="grayscale-0 opacity-30 hover:opacity-60  transition-all w-24 sm:w-full duration-500 md:w-28 lg:w-36"
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

  
  <!-- </div> -->
</template>

<style scoped>
.router-link-active {
  color: #00dacf;
  font-weight: 600;
}

</style>
