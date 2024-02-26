<script setup lang="ts">
/*
* Topbar sticks to the top, and
* it's wrapped by a <div> to fix its 
* position and set its bg color
*/
import '../../css/Topbar.css'
import MainPage from '../../views/MainPage.vue'
import Topbar from '../../components/Topbar.vue'

</script>

<template>
    
    <q-page>
        <Topbar/>
        <MainPage/>
    </q-page>

</template>

<style scoped>
</style>