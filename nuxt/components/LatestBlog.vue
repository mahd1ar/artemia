<script lang="ts" setup>
const items = reactive([
    {
        title: 'TURNING DIVING SPORT & TRIP ADVENTURES',
        excerpt:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam qui architecto, quas possimus et tempora libero sit? Asperiores sed est molestiae magnam placeat autem recusandae incidunt atque dolores iusto? Provident!',
        image: 'https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/partial-view-of-man-diving-in-ocean-alone-e1634536085170.jpg',
        tag: 'Diving',
    },
    {
        title: 'TURNING DIVING SPORT & TRIP ADVENTURES',
        excerpt:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam qui architecto, quas possimus et tempora libero sit? Asperiores sed est molestiae magnam placeat autem recusandae incidunt atque dolores iusto? Provident!',
        image: 'https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/partial-view-of-man-diving-in-ocean-alone-e1634536085170.jpg',
        tag: 'Diving',
    },
    {
        title: 'TURNING DIVING SPORT & TRIP ADVENTURES',
        excerpt:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam qui architecto, quas possimus et tempora libero sit? Asperiores sed est molestiae magnam placeat autem recusandae incidunt atque dolores iusto? Provident!',
        image: 'https://templatekit.jegtheme.com/findive/wp-content/uploads/sites/185/2021/10/partial-view-of-man-diving-in-ocean-alone-e1634536085170.jpg',
        tag: 'Diving',
    },
]);
</script>

<template>
    <section class="container">
        <h2 class="text-center text-3xl">Latest Blogs and Articlas</h2>
        <p class="px-48 text-center text-gray-500 mt-4 leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>

        <div class="grid grid-cols-3 gap-4 mt-8">
            <div v-for="(i, idx) in items" :key="idx" class="flex flex-col">
                <div class="relative">
                    <img :src="i.image" class="rounded-sm" alt="" />
                    <span
                        class="inline-block bg-primary px-2 py-1 right-4 absolute top-4"
                    >
                        {{ i.tag }}
                    </span>
                </div>
                <h4 class="text-xl font-bold text-center my-4">
                    {{ i.title }}
                </h4>
                <p class="line-clamp-2 text-gray-600">
                    {{ i.excerpt }}
                </p>

                <NuxtLink
                    to="#"
                    class="text-primary font-bold text-center text-sm my-4 tracking-widest opacity-75 uppercase"
                >
                    REad more</NuxtLink
                >
            </div>
        </div>
    </section>
</template>

<style scoped></style>
