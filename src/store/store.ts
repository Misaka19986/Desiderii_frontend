import { defineStore } from 'pinia'

export const store = defineStore('userInfo', {
    state: () => {
        return {
            user: null as userState | null,
        }
    }
})

interface userState {
    uid: number
    is_logined: boolean
}