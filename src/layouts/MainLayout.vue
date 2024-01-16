<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="topbar">
      <q-toolbar class="">
        <q-avatar size="xl">
          <img src="src/assets/desiderii_logo.png" alt="Desiderii" />
        </q-avatar>
        <q-toolbar-title class=" font-serif text-h4">Desiderii</q-toolbar-title>
        <q-tabs v-model="tab" class="h-full">
          <q-tab name="home" to="/" exact>
            <q-icon name="home" />
            <q-tab-label>主页</q-tab-label>
          </q-tab>
          <q-tab name="chat" to="/chat">
            <q-icon name="chat" />
            <q-tab-label>聊天室</q-tab-label>
          </q-tab>
          <q-tab name="game" to="/game">
            <q-icon name="gamepad" />
            <q-tab-label>游戏</q-tab-label>
          </q-tab>
        </q-tabs>
        <q-space />
        <q-btn icon="account_circle" label="登录" class="q-mr-sm" outline>
          <q-tooltip>登录</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-scroll-area></q-scroll-area>
  </q-layout>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
const tab: Ref<string> = ref('home')
</script>

<style scoped>
.topbar {
  backdrop-filter: blur(10px);
}
</style>
