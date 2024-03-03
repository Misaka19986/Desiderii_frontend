<script setup lang="ts">
/*
* Login page
* It appears when user accessing to root domain
*/
import { ref } from 'vue'
import '../../css/Login.css'
import { postUserLogin, postUserRegister } from '../../utils/API.ts'
import router from '../../router';

// Select 'login' or 'register'
// and change the form
const selectedTab = ref('login')

// Record user input
const form = ref({
    name: '',
    phone: '',
    email: '',
    password: '',
})

// ConfirmPassword must perfectly match password
const confirmPassword = ref('')

// Alert
const alert = ref(false)
const alertMessage = ref('')

const login = () => {
    postUserLogin(form.value).then((res) => {
        if(!res){
            alert.value = true
            alertMessage.value = '用户名或密码错误！'
        }else{
            router.push('/MainPage')
        }
    })
}

const register = () => {
    postUserRegister(form.value).then((res) => {
        if(201 == res){
            alert.value = true
            alertMessage.value = '注册失败！'
        }else if(202 == res){
            alert.value = true
            alertMessage.value = '用户名已被使用！'
        }else if(203 == res){
            alert.value = true
            alertMessage.value = '邮箱已被使用！'
        }
        else if(200 == res){
            alert.value = true
            alertMessage.value = '注册成功！'
            selectedTab.value = 'login'
        }
    })
}

</script>

<template>
    <!--Wrapper-->
    <q-page class="background">

        <q-card class="login_card absolute">
            <!--Login/Register options-->
            <q-card-section class="row top-2">
                <q-tabs
                    v-model="selectedTab"
                    indicator-color="primary"
                    >
                    <q-tab name="login" label="登录"/>
                    <q-tab name="register" label="注册"/>
                </q-tabs>
            </q-card-section>

            <q-separator/>

            <!--User input-->
            <q-card-section>
                <!--Login-->
                <q-form v-if="selectedTab === 'login'" 
                    class="q-gutter-md" 
                    @submit="login">
                    <q-input
                        v-model="form.name"
                        outlined
                        label="用户名/手机号/邮箱"
                        lazy-rules
                        clearable
                        :rules="[
                           val => !!val || '请输入用户名/手机号/邮箱'
                        ]"
                    />
                    <q-input
                        v-model="form.password"
                        outlined
                        label="密码"
                        lazy-rules
                        clearable
                        type="password"
                        :rules="[
                            val => !!val || '请输入密码'
                        ]"
                    />
                    <div>
                        <q-btn color="secondary" 
                        label="GO"
                        type="submit"/>
                    </div>
                </q-form>
                <!--Register-->
                <q-form v-if="selectedTab === 'register'" 
                    class="q-gutter-md" 
                    @submit="register">
                    <q-input
                        v-model="form.name"
                        outlined
                        label="用户名"
                        hint="长度小于15，大于5"
                        lazy-rules
                        clearable
                        :rules="[
                            val => !!val || '请输入用户名',
                            val => val.length >= 5 || val.length < 15 || '用户名不能超过15个字符，且至少有5个字符'
                        ]"
                    />
                    <q-input
                        v-model="form.phone"
                        outlined
                        label="手机号(选填)"
                        hint="必须为11位"
                        lazy-rules
                        clearable
                        :rules="[
                            val => !val || (val.length === 11 && /^\d+$/.test(val)) || '手机号不正确'
                        ]"
                    />
                    <q-input
                        v-model="form.email"
                        outlined
                        label="邮箱(选填)"
                        hint="xxx@xxx.xx"
                        lazy-rules
                        clearable
                        :rules="[
                            val => !val || /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/.test(val) || '请输入正确的邮箱'
                        ]"
                    />
                    <q-input
                        v-model="form.password"
                        outlined
                        label="密码"
                        hint="6-20位英文字母、数字或者符号，至少包含其中两种"
                        lazy-rules
                        clearable
                        type="password"
                        :rules="[
                            val => !!val || '请输入密码',
                            val => /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(val) || '请输入正确的密码'
                        ]"
                    />
                    <q-input
                        v-model="confirmPassword"
                        outlined
                        label="确认密码"
                        hint="必须与密码一致"
                        lazy-rules
                        clearable
                        type="password"
                        :rules="[
                            val => !!val || '请输入确认密码',
                            () => form.password === confirmPassword || '两次密码不一致'
                        ]"
                    />
                    <div>
                        <q-btn color="secondary" 
                        label="GO"
                        type="submit"/>
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
        
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

<style scoped>
.q-btn{
    /* Bigger button size */
    width: 100% !important;
}
</style>