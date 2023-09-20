import { defineStore } from 'pinia'

export const useAppState = defineStore('appState', {
  state () {
    return {
      sideNavIsOpen: false,
      menu: [] as {fa:string, en:string, link:string}[]
    }
  },
  getters: {
    isMenuOpen: (state) => {
      return state.sideNavIsOpen
    },
    menuItems: state => state.menu
  },
  actions: {
    toggleMenu (open? : boolean) {
      if (open === undefined) { open = !this.sideNavIsOpen }

      this.sideNavIsOpen = open
    },
    addMenuItem (item: {fa:string, en:string, link:string}) {
      this.menu.push(item)
    }
  }
})
