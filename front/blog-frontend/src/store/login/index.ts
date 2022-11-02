import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  state: () => {
    return { 
      token: localStorage.getItem('token') || ''
    }
  },
  actions: {
    changeToken(token: string) {
      this.token = token
    }
  }
})