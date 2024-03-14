<script setup lang="ts">
/*
* Topbar sticks to the top, and
* it's wrapped by a <div> to fix its 
* position and set its bg color
*/
import { ref } from 'vue';
import '../css/Topbar.css'
import router from '../router/index.ts'


// Check user has logged in or not
const isLogin = ref(localStorage.getItem('isLogin'))

// User name
const name = ref(localStorage.getItem('name'))

</script>

<template>
  <!--Wrapper-->
  <div class="topbar bg-slate-300 fixed top-0 left-0 right-0">

    <q-toolbar class="flex flex-row flex-nowrap">
        <!--Logo-->
        <q-avatar size="45px">
          <img src="../assets/desiderii_logo.png"/>
        </q-avatar>

        <!--Title-->
        <q-toolbar-title class="font-serif text-h4">Desiderii</q-toolbar-title>
        
        <!--Switch tabs-->
        <q-tabs class="text-h5">
            <q-route-tab to="/mainpage" label="主页"/>
            <q-route-tab to="/chat" label="聊天室"/>
            <q-route-tab to="/game" label="游戏"/>
        </q-tabs>

        <q-space/>

        <!--Login/User space button-->
        <q-btn v-if="isLogin != 'true'" no-shadow outline @click="router.push('/')">
        login
        </q-btn>

        <!--If logged-in, show avatar-->
        <q-btn v-if="isLogin === 'true'" no-shadow outline @click="router.push('/userspace/' +  name)">
        个人空间
        </q-btn>

    </q-toolbar>

  </div>
</template>

<style scoped>
</style>
