import { defineStore } from 'pinia'
import type { TopMenuQuery } from '@/gql/graphql'

type Contact = Omit< NonNullable<TopMenuQuery['contactUs']>, '__typename'>

export const useAppState = defineStore('appState', {
  state () {
    return {
      sideNavIsOpen: false,
      menu: [] as {fa:string, en:string, link:string}[],
      _contact: {
        email: '',
        instagram: '',
        tel: '',
        telegram: '',
        whatsapp: '',
        bale: ''
      } as Contact
    }
  },
  getters: {
    isMenuOpen: (state) => {
      return state.sideNavIsOpen
    },
    menuItems: state => state.menu,
    contact: state => state._contact
  },
  actions: {
    toggleMenu (open? : boolean) {
      if (open === undefined) { open = !this.sideNavIsOpen }

      this.sideNavIsOpen = open
    },
    addMenuItem (item: {fa:string, en:string, link:string}) {
      this.menu.push(item)
    },
    setContact (contact: Contact) {
      this._contact = contact
      // (Object.keys(contact) as (keyof NonNullable<TopMenuQuery['contactUs']>)[])
      //   .forEach((i) => {
      //     if (typeof contact[i] === 'string') {
      //       this.contact[i] = contact[i]
      //     }
      //   })
    }
  }
})
