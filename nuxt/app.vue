<script lang="ts" setup>
// import '@splidejs/splide/dist/css/splide.min.css';
import '@splidejs/vue-splide/css'
import { graphql } from './gql'
import { useAppState } from '@/stores/appState'

const appState = useAppState()

const MENU = graphql(`
query topMenu {
  mainMenus {
  id
  link
  en {
    title
    content
  }  
  fa {
    title
    content
  }
  }
}
`)
const { onResult } = useQuery(MENU)

onResult(({ data }) => {
  data?.mainMenus?.forEach((menu) => {
    appState.addMenuItem({
      en: menu.en?.title || 'undefined',
      fa: menu.fa?.title || 'مشخص نشده',
      link: menu.link || '#'
    })
  })
})

</script>

<template>
  <div>
    <ResponsiveDebugger />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
