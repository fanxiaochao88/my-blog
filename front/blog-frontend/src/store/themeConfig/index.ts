import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    return { 
      status: localStorage.getItem('vueuse-color-scheme') == 'dark' ? false : true
    }
  },
  actions: {
    changeStatus(status: boolean) {
      this.status = status
    },
  },
})