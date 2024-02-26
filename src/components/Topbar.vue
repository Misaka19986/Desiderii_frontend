<script setup lang="ts">
/*
* Topbar sticks to the top, and
* it's wrapped by a <div> to fix its 
* position and set its bg color
*/
import { ref, onMounted } from 'vue';
import '../css/Topbar.css'
import router from '../router/index.ts'

// Check user has logged in or not
const isLogin = ref(localStorage.getItem('isLogin'))

// User name
const alias = ref(localStorage.getItem('alias'))

onMounted(() => {
  
})

</script>

<template>
  <!--Wrapper-->
  <div class="topbar bg-slate-300 fixed top-0 left-0 right-0">

    <q-toolbar class="flex flex-row flex-nowrap">
        <!--Logo-->
        <q-avatar size="45px">
        <img src="/src/assets/desiderii_logo.png">
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

        <!--User avatar-->
        <q-avatar>
        </q-avatar>

        <!--Login/User space button-->
        <q-btn v-if="isLogin != 'true'" no-shadow outline @click="router.push('/')">
        login
        </q-btn>

        <!--If logged-in, show avatar-->
        <q-btn round v-if="isLogin === 'true'">
          <q-avatar  
          color="warning" 
          size="42px"
          @click="router.push('/userspace/' +  alias)">
          </q-avatar>
        </q-btn>

    </q-toolbar>

  </div>
</template>

<style scoped>
</style>
