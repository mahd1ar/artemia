import { graphql } from '../gql'
// import { useAppState } from '@/stores/appState'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) { return }
  const appState = useAppState()

  const MENU = graphql(`
    query topMenu {
      mainMenus {
        id
        link
        priority
        en {
          title
          content
        }  
        fa {
          title
          content
        }
      }
      contactUs {
        email
        instagram
        tel
        telegram
        whatsapp
        bale
        address
        addressFa
        shortDescription
        shortDescriptionFa
      }
    }
`)
  const { onResult } = useQuery(MENU)

  onResult(({ data }) => {
    const menuItems = data?.mainMenus?.map((menu) => {
      return {
        en: menu.en?.title || 'undefined',
        fa: menu.fa?.title || 'مشخص نشده',
        link: menu.link || '#',
        priority: menu.priority ?? 1000
      }
    }) || []

    menuItems.sort((a, b) => a.priority - b.priority)

    menuItems.forEach(({ fa, en, link }) => {
      appState.addMenuItem({
        fa,
        en,
        link
      })
    })

    if (data.contactUs) { appState.setContact(data.contactUs) }
  })
})
