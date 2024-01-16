import API from './axios.ts'
import form from '../layouts/desktop/LoginLayout.vue'

// Sent login request to server
export async function postUserLogin() {
    await API.post('/user/login', form).then(
        (response) => {
            let data = JSON.parse(response.data)
        }
    )
}

// Sent register request to server
export function postUserRegister() {
    
}