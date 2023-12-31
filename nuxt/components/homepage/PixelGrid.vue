<script lang="ts" setup>

const props = defineProps({
  list: {
    type: Array as PropType<{src: string | null | undefined, title: string | null | undefined, description: string | null | undefined}[]>,
    required: true
  }
})
const sampleImage = 'https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/exploring-under-the-water-e1634535900542.jpg'

type ImageItem = {
    type: 'image';
    src: string;
}

type TextItem = {
    type: 'text';
    title: string;
    body: string;
}

function makeImageItem (src?: string | null): ImageItem {
  return {
    type: 'image',
    src: src || 'https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/exploring-under-the-water-e1634535900542.jpg'
  }
}

function makeTextItem (title?: string | null, body?: string | null): TextItem {
  return {
    type: 'text',
    title: title || 'KAYLA WHEATLY',
    body: body || 'Lorem ipsum dolor sit amet, consectetur adip iscing elit. sed do eius mod tempor incididunt labore magna iscing.'
  }
}

const items = computed(() => {
  return props.list && props.list.length === 6
    ? [
        makeImageItem(props.list[0].src), makeImageItem(props.list[1].src), makeTextItem(props.list[0].title, props.list[0].description), makeTextItem(props.list[1].title, props.list[1].description),

        makeTextItem(props.list[2].title, props.list[2].description), makeImageItem(props.list[2].src), makeImageItem(props.list[3].src), makeTextItem(props.list[3].title, props.list[3].description),

        makeTextItem(props.list[4].title, props.list[4].description), makeTextItem(props.list[5].title, props.list[5].description), makeImageItem(props.list[4].src), makeImageItem(props.list[5].src)

      ]
    : []
})

</script>

<template>
  <section class=" container mx-auto max-w-6xl">
    <div class=" space-y-4">
      <div
        v-for="(i, index) in list || []"
        :key="index"
        class="h-44 flex w-full md:hidden  rounded"
        :class="[index%2 || 'flex-row-reverse shadow-lg']"
      >
        <img

          :src="i.src || sampleImage"
          class="h-full object-cover w-1/2 "
          :class="[index%2 ? 'rounded-l-md' : 'rounded-r-md']"
          alt=""
        >
        <div class="w-1/2 h-full p-3 overflow-hidden">
          <div class="  h-full text-center flex flex-col justify-evenly">
            <strong class="text-lg  inline-block  relative">{{ i.title }}</strong>
            <p class="text-gray-700 line-clamp-5 text-sm">
              {{ i.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-4 grid-cols-2">
        <div
          v-for="(i, index) in items"
          :key="index"
          class="aspect-square flex-center relative hidden md:block"
          :class="[i.type === 'text' && 'p-3 lg:p-6' ]"
        >
          <ImageAnime
            v-if="i.type === 'image'"
            :src="i.src"
            alt=""
            :delay=" index * 100 "
            class="w-full h-full object-cover relative"
          />
          <div v-else class="h-full w-full text-center  overflow-hidden">
            <strong class="font-bold relative text-lg lg:text-xl">
              {{ i.title }}
            </strong>
            <p class="mt-2 text-gray-600 italic lg:text-base text-ms line-clamp-5">
              {{ i.body }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
