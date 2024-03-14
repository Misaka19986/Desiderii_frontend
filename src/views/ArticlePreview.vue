<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MdEditor, MdPreview, MdCatalog} from 'md-editor-v3'
import router from '../router/index.ts'
import '../css/Article.css'
import 'md-editor-v3/lib/style.css'
import { useRoute } from 'vue-router'
import { Article, getArticleByTitle } from '../utils/API.ts'

const text = ref('# test')
const id = 'body'

const article = ref(new Article)

onMounted(() => {
    let route = useRoute()
    let params = route.params

    getArticleByTitle(params.title).then(
        (res) => {
            if(!res){
                router.push('/mainpage')
            }else{
                article.value = res
                text.value = res.content
            }
        }
    )
})

</script>

<template>
    <!--Wrapper-->
    <div class="bg-slate-50">
        <q-card class="left-1/4 right-1/4 top-16 w-1/2 absolute">
            <q-card-section class="flex justify-between">
                <div class="font-mono font-extrabold text-4xl">{{ article.title }}</div>
                <div class="font-mono font-bold text-xl flex content-end">{{ article.author }}</div>
            </q-card-section>
            <q-card-section class="flex-col">
                <div class="font-mono font-medium text-slate-400">上传时间: {{ article.create_time }}</div>
                <div class="font-mono font-medium text-slate-400">更新时间: {{ article.update_time }}</div>
            </q-card-section>
            <MdPreview
                :editorId="id"
                :modelValue="text"
                :readOnly=true
            />
        </q-card>
        <q-card class="catalog top-16 w-auto fixed">
            <MdCatalog 
                :editorId="id"
            />
        </q-card>
    </div>
    
</template>

<style>
</style>