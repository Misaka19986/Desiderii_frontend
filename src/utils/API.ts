import API from './axios.ts'

class Form {
    alias: string = ''
    phone: string = ''
    email: string = ''
    password: string = ''
}

// Sent login request to server
export async function postUserLogin(form: Form): Promise<boolean> {
    console.log("Logining...")
    console.log(form)

    let res = false

    await API.post('/user/login', form).then(
        (response) => {
            let data = response.data
            if(101 == data.code){
                console.log('登录失败！')
            }else{
                console.log('登录成功！')

                // Set user info
                localStorage.setItem('alias', form.alias)
                localStorage.setItem('isLogin', 'true')
                localStorage.setItem('accessToken', data.data['accessToken'])
                localStorage.setItem('refreshToken', data.data['refreshToken'])

                console.log('alias: ' + localStorage.getItem('alias'))
                console.log('accessToken: ' + localStorage.getItem('accessToken'))
                console.log('refreshToken: ' + localStorage.getItem('refreshToken'))

                res = true
            }
        }
    )

    return res
}

// Sent register request to server
export async function postUserRegister(form: Form): Promise<boolean> {
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

// export async function getUserInfoByName(alias: string): Promise<Form> {
//     await API.post('/user/getUserInfo', alias)
// }

export async function postGetAllPostPreviews(): Promise<boolean> {
    console.log("Request posts' previews...")

    let res = false
    return res
}