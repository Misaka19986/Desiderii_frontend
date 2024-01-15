<script setup lang="ts">
import '../assets/css/Topbar.css'

</script>

<template>
  <q-toolbar>
    <q-toolbar-title class="font-mono">
      Title
    </q-toolbar-title>
  </q-toolbar>

  <q-tabs align="left">
    <q-route-tab to="/page1" label="Page One" />
    <q-route-tab to="/page2" label="Page Two" />
    <q-route-tab to="/page3" label="Page Three" />
  </q-tabs>
</template>

<style scoped>
</style>
