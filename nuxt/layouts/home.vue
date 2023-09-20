<script lang="ts" setup>
// import { graphql } from '~/gql';

// const MENU = graphql(`
// query topMenu {
//   mainMenus {
//   id
//   link
//   en {
//     title
//     content
//   }
//   fa {
//     title
//     content
//   }
//   }
// }
// `)

// const { onResult,result } = useQuery(MENU)

</script>

<template>
  <div>
    <slot />

    <FooterSection class="mt-28" />
  </div>
</template>

<style scoped></style>
