import { defineStore } from 'pinia'

export const useOtherStore = defineStore('other', {
  state: () => {
    return {
      isSearch: false,
      searchStr: ''
    }
  },
  actions: {
    changeIsSearch(str: string) {
      this.isSearch = !this.isSearch
      this.searchStr = str
    }
  }
})
