import API from './axios.ts'

export class Form {
    name: string | null = ''
    phone: string | null = ''
    email: string | null = ''
    password: string | null = ''

    constructor(name: string, phone: string, email: string, password: string) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
    }
}

export class UserInfo {
    name: string | null = ''
    phone: string | null = ''
    email: string | null = ''
    avatar: string | null = ''
    create_time: string | null = ''
    signature: string | null = ''

    constructor(name: string, phone: string, email: string, avatar: string, create_time: string, signature: string) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.avatar = avatar;
        this.create_time = create_time;
        this.signature = signature;
    }
}

export async function postObtainTokens(name: string | null, password: string | null): Promise<boolean>{
    console.log('Obtain tokens...')

    let res = false

    await API.post('/token/obtain', {'name': name, 'password': password}).then(
        (response) => {
            let data = response.data
            console.log(response)

            localStorage.setItem('accessToken', data['access'])
            localStorage.setItem('refreshToken', data['refresh'])

            console.log('accessToken: ' + localStorage.getItem('accessToken'))
            console.log('refreshToken: ' + localStorage.getItem('refreshToken'))

            res = true
        }
    )

    return res
}

export async function postRefreshTokens(): Promise<boolean>{
    console.log('Refresh tokens...')

    let res = false

    let token = localStorage.getItem('refreshToken')

    await API.post('/token/refresh', {'refresh': token}).then(
        (response) => {
            let data = response.data

            if(data['access']){
                localStorage.setItem('accessToken', data['access'])

                res = true
            }
        }
    ).catch(
        (error) => {
            res = false
    })

    return res
}

// Sent login request to server
export async function postUserLogin(form: Form): Promise<boolean> {
    console.log('Logining...')
    console.log(form)

    let res = false

    await API.post('/user/login', form).then(
        (response) => {
            let data = response.data
            console.log(data)
            if(100 == data.code){
                console.log('登录成功！')

                let name
                
                if(null == form.name){
                    name = ''
                }else{
                    name = form.name
                }

                // Set user info
                localStorage.setItem('name', name)
                localStorage.setItem('isLogin', 'true')
                // localStorage.setItem('accessToken', data['token'])
                // localStorage.setItem('refreshToken', data.data['refreshToken'])

                console.log('name: ' + localStorage.getItem('name'))
                // console.log('accessToken: ' + localStorage.getItem('accessToken'))
                // console.log('refreshToken: ' + localStorage.getItem('refreshToken'))

                res = true

                postObtainTokens(name, form.password)
                
            }else{
                console.log('登录失败！')
            }
        }
    )

    return res
}

// Sent register request to server
export async function postUserRegister(form: Form): Promise<number> {
    console.log('Registering...')
    console.log(form)

    let res = 201

    await API.post('/user/register', form).then(
        (response) => {
            let data = response.data
            console.log(data)
            if(200 == data.code){
                console.log('注册成功！')

                res = 200
            }else if(202 == data.code){
                console.log('用户名重复！')

                res = 202
            }else if(203 == data.code){
                console.log('邮箱重复！')

                res = 203   
            }
        }
    )
    
    return res
}

// Sent logout request to server
export async function postUserLogout(): Promise<boolean> {
    console.log('Logout...')

    let res = false

    await API.post('/user/logout').then(
        (response) => {
            let data = response.data
            
            if(100 == data.code){
                console.log('登出成功！')

                res = true
            }else{
                console.log('登出失败！')
            }
        }
    )

    return res
}

export async function getUserInfoByName(name: string | null): Promise<UserInfo | null> {
    await API.post('/user/getUserInfoByName', name).then(
        (response) => {
            let data = response.data
            console.log(data)
            if(100 == data.code){
                let user = data.data
                const userInfo = new UserInfo(
                    user.name,
                    user.phone,
                    user.email,
                    user.avatar,
                    user.create_time,
                    user.signature
                )

                return userInfo
            }else{
                console.log('获取用户信息失败！')
            }
        }
    )

    return null
}

export async function getAllPostPreviews(): Promise<boolean> {
    console.log('Request posts previews...')

    let res = false
    return res
}