<script setup lang="ts">
import { onMounted, ref } from 'vue'
import router from '../router/index.ts'
import { getAllArticlePreviews } from '../utils/API.ts';

const previews = ref([{}])

const onPreviewClick = (preview: {}) => {
    console.log(preview)

    router.push('/article/' + preview.title)
}

onMounted(() => {
    getAllArticlePreviews().then(
        (res) => {
            previews.value = res
        }
    )
})

</script>

<template>
    <!--Wrapper-->
    <q-page class="bg-slate-50">
        <div class="w-1/2 absolute left-1/4 right-1/4 top-16 q-gutter-md">
            <q-card v-for="preview in previews" @click="onPreviewClick(preview)">
                <q-card-section class="flex justify-between">
                    <div class="font-mono font-extrabold text-3xl">{{ preview.title }}</div>
                    <div class="font-mono font-bold text-xl flex content-end">by {{ preview.author }}</div>
                </q-card-section>
                <q-card-section>
                    <div class="font-mono font-light text-slate-400">{{ preview.content }} ...</div>
                </q-card-section>
                <q-card-section>
                    <div class="font-mono font-medium ">发布时间： {{ preview.create_time }}</div>
                </q-card-section>
            </q-card>
        </div>
    </q-page>

</template>

<style scoped>

</style>
