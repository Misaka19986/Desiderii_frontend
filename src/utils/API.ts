import API from './axios.ts'

// Sent login request to server
export async function postUserLogin(form: {}): Promise<boolean> {
    console.log("Logining...")
    console.log(form)

    let res = false

    await API.post('/user/login', form).then(
        (response) => {
            let data = response.data
            if(101 == data.code){
                console.log('登录失败！')
            }else{
                localStorage.setItem('accessToken', data.data['accessToken'])
                localStorage.setItem('refreshToken', data.data['refreshToken'])

                res = true
            }
        }
    )

    return res
}

// Sent register request to server
export async function postUserRegister(form: {}): Promise<boolean> {
    console.log("Registering...")
    console.log(form)

    let res = false

    await API.post('/user/register', form).then(
        (response) => {
            let data = response.data
            console.log(data)
            if(201 == data.code){
                console.log('注册失败！')
            }else{
                res = true
            }
        }
    )
    
    return res
}