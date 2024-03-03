<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Logout as logout_icon, Edit } from '@icon-park/vue-next'
import router from '../router/index.ts'
import {  postUserLogout, getUserInfoByName, Form, UserInfo ,} from '../utils/API.ts'
import '../css/UserSpace.css'

// Alert
const alert = ref(false)
const alertMessage = ref('')

// User name
const name = ref(localStorage.getItem('name'))

// User info
var userInfo: UserInfo = new UserInfo('', '', '', '', '', '')

// Logout button
const logout = () => {
    let form = new Form('', '', '', '')

    if(null == localStorage.getItem('name') || 'false' === localStorage.getItem('isLogin')){
        alert.value = true
        alertMessage.value = '登出失败！'

        return
    }else{
        form.name = localStorage.getItem('name')
    }

    postUserLogout(form).then(
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

// When enter userspace, request for user info
onMounted(() => {
    // getUserInfoByName(name.value).then(
    //     (res) => {
    //         if(!res){
    //             alert.value = true
    //             alertMessage.value = '读取用户信息失败！'
    //         }else{
    //             userInfo = res
    //         }
    //     }
    // )
})

</script>
<template>
    <!--Wrapper-->
    <q-page class="bg-slate-50" >
        <q-card class="user_info_card absolute">
            <q-card-section class="flex justify-between bg-transparent">
                <!--User avatar-->
                <q-avatar size="144px" color="red">
                </q-avatar>
                <!--User name-->
                <div class="font-mono font-extrabold text-5xl">
                    {{ name }}
                </div>
            </q-card-section>
            <!--User detail-->
            <q-card-section class="font-mono font-bold text-slate-400
            flex flex-wrap flex-row justify-between">
                <div>电话: {{ 111444444444 }}</div>
                <div>邮箱: {{ '114514@qqq,c' }}</div>
                <div>注册时间: {{ '1145-14-19' }}</div>
                <div>个人签名: {{ 'testtesttest' }}</div>
            </q-card-section >
            <!--History-->
            <q-card-section>
                <h5>This is a test</h5>
            </q-card-section>
        </q-card>
        <q-btn round color="red" class="logout_button absolute" @click="logout">
            <logout_icon theme="two-tone" size="20" :fill="['#ffffff' ,'#ffffff']"/>
        </q-btn>
        <q-btn round color="info" class="edit_button absolute">
            <edit theme="two-tone" size="20" :fill="['#ffffff' ,'#ffffff']"/>
        </q-btn>

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