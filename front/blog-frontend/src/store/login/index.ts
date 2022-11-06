import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
  state: () => {
    return { 
      token: localStorage.getItem('token') || '',
      avatarUrl: localStorage.getItem('avatarUrl') || ''
    }
  },
  actions: {
    changeToken(token: string) {
      this.token = token
    },
    changeAvatarUrl(url: string) {
      this.avatarUrl = url
    }
  }
})