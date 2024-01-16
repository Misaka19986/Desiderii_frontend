<script setup lang="ts">
/*
* Login page
* It appears when user accessing to root domain
*/
import { ref } from 'vue'
import '../../css/Login.css'
import { postUserLogin, postUserRegister } from '../../utils/API.ts'

// Select 'login' or 'register'
// and change the form
const selectedTab = ref('login')

// Record user input
export const form = ref({
    alias: '',
    phone: '',
    email: '',
    password: '',
    cofirmPassword: ''
})

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
                <q-form v-if="selectedTab === 'login'" class="q-gutter-md">
                    <q-input
                        v-model="form.alias"
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
                </q-form>
                <!--Register-->
                <q-form v-if="selectedTab === 'register'" class="q-gutter-md">
                    <q-input
                        v-model="form.alias"
                        outlined
                        label="用户名"
                        hint="长度小于25"
                        lazy-rules
                        clearable
                        :rules="[
                            val => !!val || '请输入用户名',
                            val => val.length < 15 || '用户名不能超过15个字符'
                        ]"
                    />
                    <q-input
                        v-model="form.phone"
                        outlined
                        label="手机号"
                        hint="必须为11位"
                        lazy-rules
                        clearable
                        :rules="[
                            val => !!val || '请输入手机号',
                            val => (val.length === 11 &&  /^\d+$/.test(val)) || '手机号不正确'
                        ]"
                    />
                    <q-input
                        v-model="form.email"
                        outlined
                        label="邮箱"
                        hint="xxx@xxx.xx"
                        lazy-rules
                        clearable
                        :rules="[
                            val => !!val || '请输入邮箱',
                            val => /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/.test(val) || '请输入正确的邮箱'
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
                        v-model="form.cofirmPassword"
                        outlined
                        label="确认密码"
                        hint="必须与密码一致"
                        lazy-rules
                        clearable
                        type="password"
                        :rules="[
                            val => !!val || '请输入确认密码',
                            () => form.password === form.cofirmPassword || '两次密码不一致'
                        ]"
                    />
                </q-form>
            </q-card-section>

            <!--Login button-->
            <q-card-section>
                <q-btn color="secondary" label="GO" @click="selectedTab === 'login' ? postUserLogin : postUserRegister"/>
            </q-card-section>

        </q-card>

    </q-page>

</template>

<style scoped>
</style>