<script setup lang="ts">
/*
* Topbar sticks to the top, and
* it's wrapped by a <div> to fix its 
* position and set its bg color
*/
import '../assets/css/Topbar.css'

</script>

<template>
<!--Wrapper-->
<div class="topbar bg-slate-300 fixed top-0 left-0 right-0">

  <q-toolbar class="flex flex-row flex-nowrap">
    <!--Logo-->
    <q-avatar size="60px">
      <img src="/src/assets/desiderii_logo.png">
    </q-avatar>

    <!--Title-->
    <q-toolbar-title class="font-serif text-h4">Desiderii</q-toolbar-title>
    
    <!--Switch tabs-->
    <q-tabs class="tabs">
      <q-route-tab to="/" label="主页"/>
      <q-route-tab to="/page2" label="聊天室"/>
      <q-route-tab to="/page3" label="游戏"/>
    </q-tabs>

    <q-space/>

    <!--User avatar-->
    <q-avatar>
    </q-avatar>

    <!--Login/User space button-->
    <q-btn no-shadow outline>
      login
    </q-btn>

  </q-toolbar>

</div>
</template>

<style scoped>
</style>
