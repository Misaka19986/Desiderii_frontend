<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Logout as logout_icon, Edit as edit_icon, AddPicture} from '@icon-park/vue-next'
import router from '../router/index.ts'
import {   Form, UserInfo, postUserLogout, getUserInfoBySession, updateUserInfoBySession, } from '../utils/API.ts'
import '../css/UserSpace.css'

// Alert
const alert = ref(false)
const alertMessage = ref('')

// Edit
const edit = ref(false)

// Upload
const upload = ref(false)

// Access token
const access = ref('')

// User info
const userInfo = ref(new UserInfo('', '', '', '', '', ''))
const userInfoEdited = ref(new UserInfo('', '', '', '', '', ''))

// Avatar url
const avatar = ref(null)

// Logout button
const onLogout = () => {
    let form = new Form('', '', '', '')

    if(null == localStorage.getItem('name') || 'false' === localStorage.getItem('isLogin')){
        alert.value = true
        alertMessage.value = '登出失败！'

        return
    }else{
        form.name = localStorage.getItem('name')
    }

    postUserLogout().then(
        (res) => {
            if(!res){
                alert.value = true
                alertMessage.value = '登出失败！'
            }else{
                localStorage.clear()
                localStorage.setItem('isLogin', 'false')
                router.push('/')
            }
        }
    )
}

// Edit button
const onEdit = () => {
    edit.value = true
}

// Upload avatar
const onUpload = () => {
    upload.value = true

    access.value = 'Bearer ' + localStorage.getItem('accessToken')
}

const onUploadFailed = () => {
    alert.value = true
    alertMessage.value = '上传失败！'
}

const onUploadFinished = () => {
    router.go(0)
}

const submitEdition = () => {
    localStorage.setItem('name', userInfoEdited.value.name)

    updateUserInfoBySession(userInfoEdited.value).then(
        (res) => {
            if(101 == res){
                alert.value = true
                alertMessage.value = '修改失败！'
            }else if(102 == res){
                alert.value = true
                alertMessage.value = '用户名已被使用！'
            }else if(103 == res){
                alert.value = true
                alertMessage.value = '邮箱已被使用！'
            }
            else if(100 == res){
                alert.value = true
                alertMessage.value = '修改成功！'

                router.go(0)
            }
        }
    )
}

// When enter userspace, request for user info
onMounted(() => {
    getUserInfoBySession().then(
        (res) => {
            if(!res){
                alert.value = true
                alertMessage.value = '读取用户信息失败！'
            }else{
                userInfo.value = res
                avatar.value = localStorage.getItem('avatar')
            }
        }
    )
})

</script>
<template>
    <!--Wrapper-->
    <q-page class="bg-slate-50" >

        <q-card class="user_info_card absolute">
            <q-card-section class="flex justify-between bg-transparent">
                <!--User avatar-->
                <q-avatar size="144px" color="red">
                    <img :src="avatar">
                </q-avatar>
                <!--User name-->
                <div class="flex flex-col items-end">
                    <div class="font-mono font-extrabold text-5xl">
                        {{ userInfo.name }}
                    </div>
                    <div class="font-mono font-bold text-xl">
                        {{ userInfo.signature }}
                    </div>
                </div>
            </q-card-section>
            <!--User detail-->
            <q-card-section class="font-mono font-bold text-slate-400
            flex flex-wrap flex-row justify-between">
                <div>电话: {{ userInfo.phone }}</div>
                <div>邮箱: {{ userInfo.email }}</div>
                <div>注册时间: {{ userInfo.create_time }}</div>
            </q-card-section >
            <!--History-->
            <q-card-section>
                <h5>This is a test</h5>
            </q-card-section>
        </q-card>

        <q-btn round color="red" class="logout_button absolute" @click="onLogout">
            <logout_icon theme="two-tone" size="20" :fill="['#ffffff' ,'#ffffff']"/>
        </q-btn>
        <q-btn round color="info" class="edit_button absolute" @click="onEdit">
            <edit_icon theme="two-tone" size="20" :fill="['#ffffff' ,'#ffffff']"/>
        </q-btn>
        <q-btn round color="blue" class="upload_button absolute" @click="onUpload">
            <add-picture theme="two-tone" size="20" :fill="['#ffffff' ,'#ffffff']"/>
        </q-btn>
        
        <!--edit-->
        <q-dialog v-model="edit">
            <q-card>
                <q-card-section>
                    <div class="font-bold text-xl">
                        修改信息
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-form class="q-gutter-md"
                        @submit="submitEdition"
                    >
                        <q-input
                            v-model="userInfoEdited.name"
                            outlined
                            label="修改用户名"
                            :hint="userInfo.name"
                            lazy-rules
                            clearable
                            :rules="[
                                val => !!val || '请输入用户名',
                                val => val.length >= 5 || val.length < 15 || '用户名不能超过15个字符，且至少有5个字符'
                            ]"
                        />
                            
                        <q-input
                            v-model="userInfoEdited.phone"
                            outlined
                            label="修改电话"
                            :hint="userInfo.phone"
                            lazy-rules
                            clearable
                            :rules="[
                                val => !val || (val.length === 11 && /^\d+$/.test(val)) || '手机号不正确'
                            ]"
                        />
                        
                        <q-input
                            v-model="userInfoEdited.email"
                            outlined
                            label="修改邮箱"
                            :hint="userInfo.email"
                            lazy-rules
                            clearable
                            :rules="[
                                val => !val || /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/.test(val) || '请输入正确的邮箱'
                            ]"
                        />

                        <q-input
                            v-model="userInfoEdited.signature"
                            outlined
                            label="修改签名"
                            :hint="userInfo.signature"
                            lazy-rules
                            clearable
                            :rules="[
                                val => val.length < 50 || '签名过长'
                            ]"
                        />
                        <div>
                            <q-btn color="secondary" 
                                label="提交"
                                type="submit"
                            />
                         </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </q-dialog>

        <q-dialog v-model="upload">
            <q-uploader
                url="http://localhost:8090/user/uploadUserAvatar"
                label="上传头像 (限制10MB)"
                method="POST"
                max-file-size="10485760"
                max-files="1"
                accept=".jpg, image/*"
                :with-credentials="true"
                :headers="[
                    {name: 'Accept', value: 'application/json'},
                    {name: 'Authorization', value: access}
                ]"
                @failed="onUploadFailed"
                @finish="onUploadFinished"
            />
        </q-dialog>

        <!--alert-->
        <q-dialog v-model="alert">
            <q-card>
                <q-card-section>
                    <div class="text-h6">{{ alertMessage }}</div>
                </q-card-section>
            </q-card>
        </q-dialog>
        
    </q-page>

</template>