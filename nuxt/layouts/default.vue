<script lang="ts" setup></script>

<template>
    <div class="min-h-screen grid text-black">
        <main
            class="relative min-full flex flex-col justify-between w-full overflow-hidden"
        >
            <div class="w-full">
                <!-- TODO temp hidden -->
                <header v-show="false" class="bg-red-400 h-20 font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                    quaerat modi distinctio, quasi aliquid perferendis dolores,
                    ea blanditiis tempora unde sunt fugit sapiente in
                    repellendus ducimus molestias ut adipisci incidunt.
                </header>
                <!-- <div class="container mx-auto"> -->
                <slot />
                <!-- </div> -->
            </div>
            <FooterSection class="mt-28" />
        </main>
    </div>
</template>

<style scoped></style>
