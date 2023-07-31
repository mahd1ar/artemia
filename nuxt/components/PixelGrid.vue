<script lang="ts" setup>
const x = {
    type: 'image',
    src: 'https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/exploring-under-the-water-e1634535900542.jpg',
} as {
    type: 'image';
    src: string;
};

const y = {
    type: 'text',
    title: 'KAYLA WHEATLY',
    body: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit. sed do eius mod tempor incididunt labore magna iscing.',
} as {
    type: 'text';
    title: string;
    body: string;
};

const items = reactive([x, x, y, y, y, x, y, x, y, y, x, x]);
const smitems = reactive([x, y, x, y, x, y, x, y, x, y]);
</script>

<template>
    <section class="mt-28 container grid md:grid-cols-4 grid-cols-2">
        <div v-for="(i, index) in smitems" :key="index" class="h-44 md:hidden">
            <img
                v-if="i.type === 'image'"
                :src="i.src"
                class="h-full object-cover w-full"
                alt=""
            />
            <div v-else class="p-1 px-2 h-full text-center">
                <strong>{{ i.title }}</strong>
                <p>
                    {{ i.body }}
                </p>
            </div>
        </div>

        <div
            class="aspect-square flex-center relative hidden md:block"
            v-for="(i, index) in items"
            :key="index"
        >
            <img
                v-if="i.type === 'image'"
                :src="i.src"
                alt=""
                class="w-full h-full object-cover relative"
            />
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
