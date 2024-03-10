<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MdEditor, MdPreview, MdCatalog} from 'md-editor-v3'
import '../css/Article.css'
import 'md-editor-v3/lib/style.css'

const text = ref('# test')
const id = 'preview'

onMounted(() => {
    
})

</script>

<template>
    <!--Wrapper-->
    <q-page class="bg-slate-50">
        <q-card class="left-1/4 right-1/4 top-16 w-1/2 absolute">
            <MdPreview  
                :editorId="id"
                :modelValue="text"
                :readOnly=true
            />
        </q-card>
        <q-card class="catalog top-16 absolute">
            <MdCatalog :editorId="id"/>
        </q-card>
    </q-page>
</template>

<style>
</style>