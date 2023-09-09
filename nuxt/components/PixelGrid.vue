<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi'

const props = defineProps({
  list: {
    type: Array as PropType<{src: string | null | undefined, title: string | null | undefined, description: string | null | undefined}[]>,
    required: true
  }
})

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

const smitems = computed(() => {
  return props.list.map((i, index) => {
    return index % 2 === 0 ? makeImageItem(i.src) : makeTextItem(i.title, i.description)
  })
})

</script>

<template>
  <section class="mt-28 container grid md:grid-cols-4 grid-cols-2">
    <div v-for="(i, index) in smitems || []" :key="index" class="h-44 md:hidden">
      <img
        v-if="i.type === 'image'"
        :src="i.src"
        class="h-full object-cover w-full"
        alt=""
      >
      <div v-else class="p-1 px-2 h-full text-center">
        <strong>{{ i.title }}</strong>
        <p>
          {{ i.body }}
        </p>
      </div>
    </div>

    <div
      v-for="(i, index) in items"
      :key="index"
      class="aspect-square flex-center relative hidden md:block"
    >
      <img
        v-if="i.type === 'image'"
        :src="i.src"
        alt=""
        class="w-full h-full object-cover relative"
      >
      <div v-else class="h-full w-full text-center p-1">
        <strong class="font-bold relative">
          {{ i.title }}
        </strong>
        <p class="mt-2 text-gray-600">
          {{ i.body }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
