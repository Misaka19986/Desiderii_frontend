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

export class Article {
    title: string | null = ''
    content: string | null = ''
    create_time: string | null = ''
    update_time: string | null = ''
    author: string | null = ''
    topic: string | null = ''

    constructor(title: string | null = null, content: string | null = null,
        create_time: string | null = null, update_time: string | null = null,
        author: string | null = null, topic: string | null = null) {
        this.title = title;
        this.content = content;
        this.create_time = create_time;
        this.update_time = update_time;
        this.author = author;
        this.topic = topic;
    }

}

/*
*   Tokens
*   
*   @Functions:
*       Obtain access/refresh token
*       Refresh access token by refresh token
* 
*   @Methods:
*       postObtainTokens(name, password)
*       postRefreshTokens()
*/

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

/*
*   Users manage
*
*   @Functions:
*       Login,register user
*       User CURD
*   
*   @Methods:
*       postUserLogin(form)
*       postUserRegister(form)
*       postUserLogout()
*       
*       getUserInfoBySession()
*       updateUserInfoBySession(userInfo)
*       getUserAvatarBySession()
*       
*   @Params:
*       class Form
*       
*/

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

export async function postUserRegister(form: Form): Promise<number> {
    console.log('Registering...')
    console.log(form)

    let res = 201

    await API.post('/user/register', form).then(
        (response) => {
            let data = response.data
            
            res = parseInt(data.code, 10)
        }
    )
    
    return res
}

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

export async function getUserInfoBySession(): Promise<UserInfo | null> {
    let userInfo = null

    await API.post('/user/getUserInfoBySession').then(
        (response) => {
            let data = response.data
            console.log(data)
            if(100 == data.code){
                let user = data.data
                userInfo = new UserInfo(
                    user.name,
                    user.phone,
                    user.email,
                    user.avatar,
                    user.create_time,
                    user.signature
                )
                
                if(user.avatar){
                    let avatar = 'http://localhost:8090' + user.avatar
                    localStorage.setItem('avatar', avatar)
                }

                return userInfo
            }else{
                console.log('获取用户信息失败！')
            }
        }
    )

    return userInfo
}

export async function updateUserInfoBySession(userInfo: UserInfo): Promise<number> {
    console.log('Update user info...')

    let res = 101

    await API.post('/user/updateUserInfoBySession', userInfo).then(
        (response) => {
            let data = response.data

            res = parseInt(data.code, 10)
        }
    )

    return res
}

/*
*   Article manage
*
*   @Functions:
*       Get preview of article
*       Article CURD
*   
*   @Methods:
*       getAllArticlePreviews()
*       getArticleByName()
*       
*   @Params:
*       class Article
*       
*/

export async function getAllArticlePreviews(): Promise<any[]> {
    console.log('Request articles previews...')

    let res: any[] = []

    await API.post('article/getAllArticlePreviews').then(
        (response) => {
            let data = response.data

            if(100 == data.code){
                console.log(data)

                for(let i = 0; i < data.count; i++){
                    res.push(data.data[i])
                }
            }
        }
    )

    return res
}

export async function getArticleByName(title: string | null): Promise<Article> {
    console.log('Get article..')

    let res = new Article()

    await API.post('/article/' + title).then(
        (response) => {
            let data = response.data
        }
    )

    return res
}
