<script lang="ts" setup>
import { graphql } from '@/gql'

const FRONPAGE = graphql(`
query FrontPage {
  frontPage {
    headline
  }
}
`)

const { result } = useQuery(FRONPAGE)
</script>

<template>
  <pre>
        {{ result }}
    </pre>
  <section class="text-white relative h-[80vh] overflow-hidden flex flex-col">
    <div class="absolute w-full h-full">
      <img
        class="h-full object-cover w-full"
        src="https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/freediving-e1633923358732.jpg"
        alt=""
      >
      <div
        aria-hidden="true"
        style="background-color: #03062a; opacity: 0.7"
        class="overlay"
      />
    </div>

    <div
      class="relative h-max container mx-auto flex justify-between border-b border-white/50"
    >
      <div class="flex gap-4 text-sm py-4">
        <div class="flex gap-2">
          <!-- location -->
          <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m18.157 16.882l-1.187 1.174c-.875.858-2.01 1.962-3.406 3.312a2.25 2.25 0 0 1-3.128 0l-3.491-3.396c-.44-.431-.806-.794-1.102-1.09a8.707 8.707 0 1 1 12.314 0ZM14.5 11a2.5 2.5 0 1 0-5 0a2.5 2.5 0 0 0 5 0Z"
            />
          </svg>
          Legian Atkins West 11490, Bali
        </div>
        <div class="flex gap-2">
          <!-- mail icon -->
          <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-.4 4.25l-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44z"
            />
          </svg>

          findive@support.com
        </div>
      </div>
      <div>lorem</div>
    </div>

    <div class="relative h-full container mx-auto flex flex-col">
      <div class="flex shrink-0 justify-between items-center">
        <div class="p-2 py-1 text-3xl border-2 my-2">
          lorem
        </div>
        <div>
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
        <div
          class="absolute w-36 bottom-8 -right-8 border-[12px] border-white"
        >
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
        <svg
          v-show="false"
          class="w-14 -translate-y-1/2 text-primary absolute"
          viewBox="0 0 32 32"
        >
          <g fill="currentColor">
            <path
              d="M17.978 7.993a1.978 1.978 0 1 1-3.956 0a1.978 1.978 0 0 1 3.956 0Zm-2.118 3.975c.967 0 1.75.783 1.75 1.75v10.59a1.75 1.75 0 1 1-3.5 0v-10.59c0-.967.784-1.75 1.75-1.75Z"
            />
            <path
              d="M6 1a5 5 0 0 0-5 5v20a5 5 0 0 0 5 5h20a5 5 0 0 0 5-5V6a5 5 0 0 0-5-5H6ZM3 6a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Z"
            />
          </g>
        </svg>

        <svg
          class="w-14 -translate-y-1/2 absolute"
          viewBox="0 0 24 24"
          fill="none"
        >
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
      <h2
        class="text-tm-black relative text-4xl font-extrabold text-center"
      >
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
    <div
      v-for="i in 4"
      :key="i"
      class="hover:shadow-xl gap-2 ease-out hover:scale-90 p-6 transition-all"
    >
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
        WE WILL PAMPER YOUR EYES IN THE WATER
      </h2>
      <span class="text-gray-400 text-sm leading-7 mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
        enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo enim ad minim veniam, quis nostrud
        exercitation.
      </span>
      <div class="grid grid-cols-2">
        <div v-for="i in 2" :key="i" class="flex flex-col">
          <PieChart :percentage="88" />
          <h3 class="my-4 text-2xl font-bold">
            Dive Treavel
          </h3>
          <div class="font-xs text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed vel ipsum auctor, iaculis arcu quis
          </div>
        </div>
      </div>
    </div>
    <div class="bg-cyan-400 w-7/12" />
  </section>

  <ElementorSection class="mt-28" />

  <PixelGrid />

  <TestimonialSection class="mt-28" />

  <div class="grid grid-cols-6 gap-6 mt-28">
    <div
      v-for="i in 6"
      :key="i"
      class="grayscale-0 opacity-30 hover:opacity-60 transition-all duration-500 mx-6"
    >
      <img
        class="object-contain"
        src="https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/logo2-DTBHXU.png"
        alt=""
      >
    </div>
  </div>

  <LatestBlog class="mt-28" />
</template>

<style scoped></style>
